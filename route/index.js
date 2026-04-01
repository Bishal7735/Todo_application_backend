var express = require('express');
var router = express.Router();


var usersRouter = require('./users');
var authRouter = require('./auth');



router.use('/users', usersRouter);
router.use('/auth', authRouter);

/* GET home page. */
router.get('/', function (req, res) {
  res.send('index route');
});
/* GET home page. */
router.get('/hello', function (req, res) {
  res.send('hello from index route');
});
module.exports = router;