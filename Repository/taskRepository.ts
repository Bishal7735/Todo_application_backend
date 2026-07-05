import { CreateTaskRequest } from "../domain/taskDomain";
import { Task } from "../models";
import { generateRandomString } from "./authRepository";

export async function CreatetTaskRepository(request: CreateTaskRequest) {
    let externalId: string;
    let exists = true;
    while (exists) {
        externalId = generateRandomString(10);
        const record = await Task.findOne({
            where: { external_id: externalId },
        });
        exists = !!record;
    }
    let taskObject = {
        external_id: externalId,
        name: request.name,
        description: request.description,
        dueDate: request.dueDate,
        status: "Active",
        notes: request.notes,
    }
    // Table insert
    await Task.create(taskObject);
    console.log("User Created successfully", taskObject);
    return { "message": "Task created successfully" };
}