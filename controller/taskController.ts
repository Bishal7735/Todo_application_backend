import { Request, Response } from "express";
import  logger  from "..//logger";
import { CreateTaskRequest, UpdateTaskRequest } from "../Domain/taskDomain" ;
import { CreateTaskUsecase, DeleteTaskUsecase, GetAllTaskUsecase, TaskDetailsUsecase, UpdateTaskUsecase } from "../useCase/taskUsecase";


export async function CreateTask(req:Request,res:Response) {
    console.log("CREATE API HIT");
    logger.info('Inside task create controller');
    let request = {} as CreateTaskRequest;
    request.name = req.body.name || req.body.title;
    request.description = req.body.description;
    request.due_date = req.body.due_date || req.body.dueDate || req.body.date;
    request.notes = req.body.notes || req.body.category || "";
    request.priority = req.body.priority || "medium";
    request.status = req.body.status || "Active";
    

    logger.debug("after mapping to the task request", request);

    let response = await CreateTaskUsecase(request);
    

if(response) {
    return res.send(response);
}

return res.send({
    message: "Task Creation failed"
});
}


 export async function DeleteTask(req:Request, res:Response) {
    console.log("Delete task in controller");
    let externalId = req.params.task_ext_id as string;
    logger.debug("After deleting task with externalId ", + externalId);
let response = await DeleteTaskUsecase(externalId);

if (response) {
        return res.send({
            message: "Task deleted successfully"
        });
    }

    return res.send({
        message: "Task not found"
    });
}

export async function UpdateTask(req:Request, res:Response) {
    console.log("Inside Update Task Controller");
    let request = {} as UpdateTaskRequest;
    request.external_id= req.params.task_ext_id as string;

    const existingTask = await TaskDetailsUsecase(request.external_id);

    const name = req.body.name !== undefined ? req.body.name : req.body.title;
    request.name = name !== undefined ? name : (existingTask ? (existingTask as any).name : undefined);

    request.description = req.body.description !== undefined ? req.body.description : (existingTask ? (existingTask as any).description : undefined);

    const rawDueDate = req.body.due_date || req.body.dueDate || req.body.date;
    request.due_date = rawDueDate !== undefined ? rawDueDate : (existingTask ? (existingTask as any).due_date : undefined);

    const rawNotes = req.body.notes || req.body.category;
    request.notes = rawNotes !== undefined ? rawNotes : (existingTask ? (existingTask as any).notes : undefined);

    if (req.body.completed !== undefined) {
        request.status = req.body.completed ? "Completed" : "Active";
    } else {
        request.status = req.body.status !== undefined ? req.body.status : (existingTask ? (existingTask as any).status : undefined);
    }

    request.priority = req.body.priority !== undefined ? req.body.priority : (existingTask ? (existingTask as any).priority : undefined);

    let response = await UpdateTaskUsecase(request);

    if(response) {
    return res.send(response);
}

return res.send({
    message: "Task Updation failed"
});
}

export async function get_all_task(req:Request, res:Response) {
    console.log("Inside Get all task.");
    let response = await GetAllTaskUsecase();
    logger.info("Got the task in controller :", response)
    res.send({"all_tasks": response});
}

 export async function taskDetails(req:Request, res:Response) {
    console.log("Inside Task Details.");
let externalId = req.params.task_ext_id as string;
logger.debug("Task Details with externalId", externalId)
let response = await TaskDetailsUsecase(externalId);
logger.info("Got the task details in controller:", response);
if(response) {
    return res.send(response);
}

return res.send({
    message: "Task Not Found"
});
}