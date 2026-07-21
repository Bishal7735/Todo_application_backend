import { CreateTaskRequest, UpdateTaskRequest } from "../domain/taskDomain";
import logger from "../logger";
import { Task, UserTask } from "../models";
import { generateRandomString } from "./authRepository";
import { Op } from "sequelize";

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
        description: request.description || "",
        due_date: request.due_date || null,
        notes: request.notes || "",
        status: request.status || "Active",
        priority: request.priority || "medium",
        createdBy: request.userId || null,
    };

    const createdRecord: any = await Task.create(taskObject);
    const resultTask = createdRecord.toJSON ? createdRecord.toJSON() : createdRecord;

    // Sync to user_task junction table
    if (request.userId && createdRecord.id) {
        try {
            await UserTask.create({
                user_id: request.userId,
                task_id: createdRecord.id,
                status: createdRecord.status,
                priority: createdRecord.priority,
            });
        } catch (err) {
            logger.error("Failed to insert into user_task table: ", err);
        }
    }

    return {
        message: "Task created successfully",
        task: resultTask
    };
}

export async function DeleteTaskRepository(external_id: string, userId?: number) {
    console.log("Inside delete repository");
    const numericId = Number(external_id);
    const identifierWhere: any[] = [{ external_id: external_id }];
    if (!isNaN(numericId) && numericId > 0) {
        identifierWhere.push({ id: numericId });
    }

    const taskWhere: any = { [Op.or]: identifierWhere };
    if (userId) {
        taskWhere.createdBy = userId;
    }

    const targetTask: any = await Task.findOne({ where: taskWhere });
    if (!targetTask) return false;

    // Clean up user_task junction entries
    await UserTask.destroy({
        where: { task_id: targetTask.id }
    });

    const taskDelete = await Task.destroy({
        where: { id: targetTask.id },
    });
    return taskDelete > 0;
}

export async function UpdateTaskRepository(request: UpdateTaskRequest) {
    const numericId = Number(request.external_id);
    const identifierWhere: any[] = [{ external_id: request.external_id }];
    if (!isNaN(numericId) && numericId > 0) {
        identifierWhere.push({ id: numericId });
    }

    const taskWhere: any = { [Op.or]: identifierWhere };
    if (request.userId) {
        taskWhere.createdBy = request.userId;
    }

    const targetTask: any = await Task.findOne({ where: taskWhere });
    if (!targetTask) return false;

    let UpdateTaskObject: any = {};
    if (request.name !== undefined) UpdateTaskObject.name = request.name;
    if (request.description !== undefined) UpdateTaskObject.description = request.description;
    if (request.due_date !== undefined) UpdateTaskObject.due_date = request.due_date;
    if (request.notes !== undefined) UpdateTaskObject.notes = request.notes;
    if (request.status !== undefined) UpdateTaskObject.status = request.status;
    if (request.priority !== undefined) UpdateTaskObject.priority = request.priority;
    if (request.userId !== undefined) UpdateTaskObject.updatedBy = request.userId;

    await Task.update(UpdateTaskObject, {
        where: { id: targetTask.id }
    });

    // Update user_task junction record if applicable
    let userTaskUpdates: any = {};
    if (request.status !== undefined) userTaskUpdates.status = request.status;
    if (request.priority !== undefined) userTaskUpdates.priority = request.priority;

    if (Object.keys(userTaskUpdates).length > 0 && request.userId) {
        await UserTask.update(userTaskUpdates, {
            where: { task_id: targetTask.id, user_id: request.userId }
        });
    }

    logger.debug("Task updated successfully", UpdateTaskObject);
    return { "message": "Task updated successfully." };
}

export async function GetAllTaskRepository(userId?: number) {
    console.log("Inside Get all task repository");

    const whereCondition: any = {};
    if (userId) {
        whereCondition.createdBy = userId;
    }

    let gettask = await Task.findAll({
        where: whereCondition,
        attributes: [
            "id",
            "external_id",
            "name",
            "description",
            "notes",
            ["notes", "category"],
            "due_date",
            "status",
            "priority",
            "createdBy",
            "createdAt"
        ],
        order: [['createdAt', 'DESC']]
    });

    logger.debug("Getting all task successfully", gettask);
    return gettask;
}

export async function TaskDetailsRepository(external_id: string, userId?: number) {
    console.log("Inside task details repository");
    const numericId = Number(external_id);
    const identifierWhere: any[] = [{ external_id: external_id }];
    if (!isNaN(numericId) && numericId > 0) {
        identifierWhere.push({ id: numericId });
    }

    const taskWhere: any = { [Op.or]: identifierWhere };
    if (userId) {
        taskWhere.createdBy = userId;
    }

    const taskdetails = await Task.findOne({
        where: taskWhere,
        attributes: [
            "id",
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
    logger.debug("Getting task details successfully", taskdetails);
    return taskdetails;
}


