var express = require('express');
var router = express.Router();
var schema = require('../schema')
var plugin = require('../plugin')
const game = require('../public/game.json')

var plugins = new plugin.PluginGroup()

plugins.addPlugin(new plugin.Plugin(
  'store',
  function(player) {
    return player.location.features.includes('general_store')
  },
  function(player, req, res) {
    var action = req.body.action
    var item = req.body.item
    var qty = req.body.quantitiy
    var total = game.items[item].price * qty
    if(action === 'buy' && player.money >= total) {
      player.money -= game.items[item].price * qty
      player.items[item].quantity += qty
    } else if (action == 'sell') {
      player.items[item].quantity -= qty
      player.money += game.items[item].value
    } else {
      res.sendStatus(400)
      return
    }
    player.save()
    res.json(player)
  }
))

plugins.addPlugin(new plugin.Plugin(
  'next',
  function(player) {
    return player.inprogress.length == 0
  },
  function(player, req, res) {

  }
))

/**
 * Get Save Number from url
 * @param {String} url 
 */
function urlSn(url) {
  return url.split('/')[1]
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

router.get('/new', function(req, res) {
  schema.newPlayer().then(function(player) {
    res.json(player)
  }).catch(function(e) {
    res.sendStatus(500)
    console.log(e)
  })
})

router.get(/^\/?.{6}\/?$/, function(req, res) {
  schema.getPlayer(urlSn(req.url)).then(function(player) {
    res.json(player)
  }).catch(function(e) {
    res.sendStatus(500)
    console.log(e)
  })
})

router.get(/^\/?[a-z1-9]{6}\/[a-zA-Z]+\/?$/, function(req, res) {
  schema.getPlayer(urlSn(req.url)).then(function(player) {
    plugins.handle(req.url.split('/')[2], player, req, res)
  }).catch(function(e) {
    res.sendStatus(500)
    console.log(e)
  })
})

module.exports = router;
