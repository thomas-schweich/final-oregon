var express = require('express');
var router = express.Router();
var schema = require('../schema')

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

router.get(/^\/?.{6}\/next\/?$/), function(req, res) {
  schema.getplayer(urlSn(req.url)).then(function(player) {
    res.json(advance(player))
  }).catch(function(e) {
    res.sendStatus(500)
    console.log(e)
  })
}

module.exports = router;
