import { get_all_task } from "../controller/taskController";
import { CreateTaskRequest, UpdateTaskRequest } from "../Domain/taskDomain";
import logger from "../logger";
import { Task } from "../models";
import task from "../models/task";
import { generateRandomString } from "./authRepository";
// import bcrypt from "bcrypt";

export async function CreatetTaskRepository(request: CreateTaskRequest) {
    console.log("INSIDE REPOSITORY");

    let externalId = "";
    let exists = true;

    while (exists) {
        externalId = generateRandomString(10);

        const record = await Task.findOne({
            where: {
                external_id: externalId
            }
        });

        exists = !!record;
    }

    const taskObject = {
        external_id: externalId,
        name: request.name,
        description: request.description,
        due_date: request.due_date,
        notes: request.notes,
        status: "Active",
        priority: request.priority, 
    };

    await Task.create(taskObject);

    return {
        message: "Task created successfully",
        task: taskObject
    };
}

export async function DeleteTaskRepository(external_id: string) {
    console.log("Inside delete repository");

    const taskDelete = await Task.destroy({
        where: {
            external_id: external_id,
        },
    });
    if (taskDelete > 0) {
        return true;
    } else {
        return false;
    }
}

export async function UpdateTaskRepository(request: UpdateTaskRequest) {

    let UpdateTaskObject = {
        name: request.name,
        description: request.description,
        due_date: request.due_date,
        notes: request.notes,
        status: request.status,
        priority: request.priority
    }

    await Task.update(UpdateTaskObject,
        {
            where: {
                external_id: request.external_id
            }
        });

    logger.debug("Task updated successfully", UpdateTaskObject);
    return { "message": "Task updated succesfully." };
}

export async function GetAllTaskRepository() {
    console.log("Inside Get all task repository");

    let gettask = await Task.findAll({
        attributes: [
            "external_id",
            "name",
            "description",
            "notes",
            ["notes", "category"],
            "due_date",
            "status",
            "priority",
            "createdAt"
        ]
    });

    logger.debug("Getting all task succesfully", gettask);
    return gettask;
}

export async function TaskDetailsRepository(external_id: string) {
    console.log("Inside task details repository");

    const taskdetails = await Task.findOne({
        where: {
            external_id: external_id,
        },
        attributes: [
            "external_id",
            "name",
            "description",
            "notes",
            ["notes", "category"],
            "due_date",
            "status",
            "priority",
            "createdBy",
            "updatedBy",
            "createdAt",
            "updatedAt",
        ]
    });
    logger.debug("Getting all task succesfully", taskdetails);
    return taskdetails;
}

