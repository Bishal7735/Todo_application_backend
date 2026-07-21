import { Router, Request, Response, NextFunction } from "express";
export let userRouter = Router();

/* GET users listing. */
userRouter.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('user route');
});

/* GET users listing. */
userRouter.get('/hello', function (req: Request, res: Response, next: NextFunction) {
  res.send('hello from user route');
});