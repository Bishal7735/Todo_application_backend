import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

import { Login, Register } from '../controller/authController';

router.post('/login', function (req: Request, res: Response) {
  Login(req, res);
});

router.post('/register', function (req: Request, res: Response) {
  Register(req, res);
});

/* GET users listing. */
router.get('/hello', function (req: Request, res: Response) {
  res.send('hello for auth route');
});

export default router;