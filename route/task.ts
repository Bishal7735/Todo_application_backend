import { Router, Request, Response, NextFunction } from "express";
import { CreateTask } from "../controller/taskController";
import { jwtAuthMiddleware } from "../middleware/jwtAuthMiddleware";
export let taskRouter = Router();

/* POST Create task */
taskRouter.post('/create', jwtAuthMiddleware, function (req: Request, res: Response, next: NextFunction) {
  CreateTask(req, res);
});

/* DELETE delet task*/
taskRouter.delete('/delete/:task-ext-id', function (req: Request, res: Response, next: NextFunction) {
  res.send('hello for auth route');
});

/* POST Update task */
taskRouter.post('/update/:task-ext-id', function (req: Request, res: Response, next: NextFunction) {
  res.send('hello for auth route');
});

/* GET Get list of tasks */
taskRouter.get('/get-all-task', function (req: Request, res: Response, next: NextFunction) {
  res.send('hello for auth route');
});

/* GET Task details */
taskRouter.get('/task-details/:task-ext-id', function (req: Request, res: Response, next: NextFunction) {
  res.send('hello for auth route');
});


