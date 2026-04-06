import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

/* GET users listing. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('user route');
});

/* GET users listing. */
router.get('/hello', function (req: Request, res: Response, next: NextFunction) {
  res.send('hello from user route');
});


export default router;