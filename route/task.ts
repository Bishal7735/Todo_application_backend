import { Router, Request, Response, NextFunction } from "express";
export let taskRouter = Router();
import {CreateTask,UpdateTask,DeleteTask,get_all_task, taskDetails} from "../controller/taskController"
import { jwtAuthMiddleware } from "../middleware/jwtAuthMiddleware";

taskRouter.post('/create',jwtAuthMiddleware, function (req: Request, res: Response, next: NextFunction) {
  CreateTask(req,res);
});

/* DELETE delet task*/
taskRouter.delete('/delete/:task_ext_id',jwtAuthMiddleware,function (req: Request, res: Response, next: NextFunction) {
  DeleteTask(req,res);
});

/* POST Update task */
taskRouter.post('/update/:task_ext_id',jwtAuthMiddleware,function (req: Request, res: Response, next: NextFunction) {
  UpdateTask(req,res);
});

/* PUT Update task (alternative) */
taskRouter.put('/update/:task_ext_id',jwtAuthMiddleware,function (req: Request, res: Response, next: NextFunction) {
  UpdateTask(req,res);
});

/* GET Get list of tasks */
taskRouter.get('/getAllTask', jwtAuthMiddleware, function (req: Request, res: Response, next: NextFunction) {
 get_all_task(req,res);
});

/* GET Get list of tasks (alternative) */
taskRouter.get('/get-all-task', jwtAuthMiddleware, function (req: Request, res: Response, next: NextFunction) {
 get_all_task(req,res);
});

/* GET Task details */
taskRouter.get('/task_details/:task_ext_id',jwtAuthMiddleware, function (req: Request, res: Response, next: NextFunction) {
taskDetails(req,res);
});