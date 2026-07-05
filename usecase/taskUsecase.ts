import { CreateTaskRequest } from "../domain/taskDomain";
import { CreatetTaskRepository } from "../repository/taskRepository";

export async function CreateTaskUsecase(request: CreateTaskRequest) {
    return await CreatetTaskRepository(request)
}