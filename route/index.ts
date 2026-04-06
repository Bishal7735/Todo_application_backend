import express from "express";
const router = express.Router();

import users from './users';
import authRouter from './auth';

// Changed from usersRouter to users to match the import above
router.use('/users', users);
router.use('/auth', authRouter);

/* GET home page. */
router.get('/', function (_req, res) {
  res.send('index route');
});

/* GET home page. */
router.get('/hello', function (_req, res) {
  res.send('hello from index route');
});

export default router;