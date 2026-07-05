import { Request, response, Response } from "express";
import logger from "../logger";
import { CreateTaskRequest } from "../domain/taskDomain";
import { CreateTaskUsecase } from "../usecase/taskUsecase";

export async function CreateTask(req: Request, res: Response) {
    logger.info('Inside Register controller');
    logger.debug('Got the request body for the api call', req.body.first_name);
    let request = {} as CreateTaskRequest;
    request.name = req.body.name;
    request.description = req.body.description;
    request.notes = req.body.notes;
    request.dueDate = req.body.dueDate;
    logger.debug("after mapping to the user request", request);
    let response = await CreateTaskUsecase(request);
    if (response.message == "Task created successfully") {
        res.send(response)
    } else {
        res.send({ "message": "Task Creation failed" })
    }
}