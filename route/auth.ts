import { Router, Request, Response, NextFunction } from "express";
export let authRouter = Router();
import { Login, Refresh, Register } from "../controller/authController"

authRouter.post('/login', function (req: Request, res: Response, next: NextFunction) {
  Login(req, res);
});

authRouter.post('/refresh', function (req: Request, res: Response, next: NextFunction) {
  Refresh(req, res);
});

authRouter.post('/register', function (req: Request, res: Response, next: NextFunction) {
  Register(req, res);
});

/* GET users listing. */
authRouter.get('/hello', function (req: Request, res: Response, next: NextFunction) {
  res.send('hello for auth route');
});