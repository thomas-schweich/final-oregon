var express = require('express');
var router = express.Router();
var schema = require('../schema')
var plugin = require('../plugin')
var TermEm = require('../termEm').TermEm
const game = require('../public/game.json')
const store = require('./store')
const home = require('./home')

var plugins = new plugin.PluginGroup()

TermEm.addPlugin('general_store', store.states)
TermEm.addPlugin('home', home.states)

function termHandle(player, req, res) {
  new TermEm(player, req, res).pickUp(player, req.body.input)
}

plugins.addPlugin(new plugin.Plugin(
  'general_store',
  function(player) {
    return player.location.features.includes('general_store')
  }, 
  termHandle
))

plugins.addPlugin(new plugin.Plugin(
  'next',
  function(player) {
    return player.inprogress.length == 0
  },
  termHandle
))

plugins.addPlugin(new plugin.Plugin(
  'home',
  function(player) {
    return player.inprogress.length == 0
  },
  termHandle
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
