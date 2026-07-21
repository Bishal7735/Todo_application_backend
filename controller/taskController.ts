import { Request, Response } from "express";
import logger from "../logger";
import { CreateTaskRequest, UpdateTaskRequest } from "../domain/taskDomain";
import { CreateTaskUsecase, DeleteTaskUsecase, GetAllTaskUsecase, TaskDetailsUsecase, UpdateTaskUsecase } from "../usecase/taskUsecase";

export async function CreateTask(req: Request, res: Response) {
    console.log("CREATE API HIT", req.body);
    logger.info('Inside task create controller');
    const userId = (req as any).userId;
    let request = {} as CreateTaskRequest;
    request.userId = userId;
    request.name = req.body.name || req.body.title || "Untitled Task";
    request.description = req.body.description || "";

    const rawDueDate = req.body.due_date || req.body.dueDate || req.body.date;
    if (rawDueDate && typeof rawDueDate === 'string' && rawDueDate.trim() !== '') {
        request.due_date = rawDueDate;
    } else {
        request.due_date = null;
    }

    request.notes = req.body.notes || req.body.category || "Work";
    request.priority = req.body.priority || "medium";
    request.status = req.body.status || "Active";

    logger.debug("after mapping to the task request", request);

    let response = await CreateTaskUsecase(request);

    if (response) {
        return res.send(response);
    }

    return res.status(400).send({
        message: "Task Creation failed"
    });
}

export async function DeleteTask(req: Request, res: Response) {
    console.log("Delete task in controller");
    const userId = (req as any).userId;
    let externalId = req.params.task_ext_id as string;
    logger.debug("Deleting task with externalId ", externalId);
    let response = await DeleteTaskUsecase(externalId, userId);

    if (response) {
        return res.send({
            message: "Task deleted successfully"
        });
    }

    return res.status(404).send({
        message: "Task not found"
    });
}

export async function UpdateTask(req: Request, res: Response) {
    console.log("Inside Update Task Controller", req.body);
    const userId = (req as any).userId;
    let request = {} as UpdateTaskRequest;
    request.external_id = req.params.task_ext_id as string;
    request.userId = userId;

    const existingTask: any = await TaskDetailsUsecase(request.external_id, userId);

    const name = req.body.name !== undefined ? req.body.name : req.body.title;
    if (name !== undefined) {
        request.name = name;
    } else if (existingTask) {
        request.name = existingTask.name;
    }

    if (req.body.description !== undefined) {
        request.description = req.body.description;
    } else if (existingTask) {
        request.description = existingTask.description;
    }

    const rawDueDate = req.body.due_date || req.body.dueDate || req.body.date;
    if (rawDueDate !== undefined) {
        request.due_date = (rawDueDate && typeof rawDueDate === 'string' && rawDueDate.trim() !== '') ? rawDueDate : null;
    } else if (existingTask) {
        request.due_date = existingTask.due_date;
    }

    const rawNotes = req.body.notes || req.body.category;
    if (rawNotes !== undefined) {
        request.notes = rawNotes;
    } else if (existingTask) {
        request.notes = existingTask.notes;
    }

    if (req.body.completed !== undefined) {
        request.status = req.body.completed ? "Completed" : "Active";
    } else if (req.body.status !== undefined) {
        request.status = req.body.status;
    } else if (existingTask) {
        request.status = existingTask.status;
    }

    if (req.body.priority !== undefined) {
        request.priority = req.body.priority;
    } else if (existingTask) {
        request.priority = existingTask.priority;
    }

    let response = await UpdateTaskUsecase(request);

    if (response) {
        return res.send(response);
    }

    return res.status(400).send({
        message: "Task Updation failed"
    });
}

export async function get_all_task(req: Request, res: Response) {
    console.log("Inside Get all task.");
    const userId = (req as any).userId;
    let response = await GetAllTaskUsecase(userId);
    logger.info("Got the task in controller :", response);
    res.send({ "all_tasks": response || [] });
}

export async function taskDetails(req: Request, res: Response) {
    console.log("Inside Task Details.");
    const userId = (req as any).userId;
    let externalId = req.params.task_ext_id as string;
    logger.debug("Task Details with externalId", externalId);
    let response = await TaskDetailsUsecase(externalId, userId);
    logger.info("Got the task details in controller:", response);
    if (response) {
        return res.send(response);
    }

    return res.status(404).send({
        message: "Task Not Found"
    });
}