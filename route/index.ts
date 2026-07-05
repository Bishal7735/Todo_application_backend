import express from "express";
const router = express.Router();

import users from './users';
import authRouter from './auth';
import { taskRouter } from './task';

router.use('/users', users);
router.use('/auth', authRouter);
router.use('/task', taskRouter);

/* GET home page. */
router.get('/', function (_req, res) {
  res.send('index route');
});

/* GET home page. */
router.get('/hello', function (_req, res) {
  res.send('hello from index route');
});

export default router;