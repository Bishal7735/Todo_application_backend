var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('auth route');
});

/* GET users listing. */
router.get('/hello', function(req, res, next) {
  res.send('hello for auth route');
});

module.exports = router;