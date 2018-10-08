var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var player = {
  name: String,
  location: String,
  status: String,
  inventory: {
      oxen: Number,
      ammunition: Number
  },
  party: [],
  offers: [
      {
          name: String,
          request: {
              item: String,
              amount: Number
          },
          uid: String
      },
  ],
  nearby: [
      {   
          uid: String,
          inventory: {
              oxen: Number,
              ammunition: Number
          }
      },
  ]
}


module.exports = router;
