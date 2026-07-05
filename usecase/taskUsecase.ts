import { CreateTaskRequest } from "../domain/taskDomain";
import { CreatetTaskRepository } from "../Repository/taskRepository";

export async function CreateTaskUsecase(request: CreateTaskRequest) {
    return await CreatetTaskRepository(request)
}