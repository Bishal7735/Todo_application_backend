import { CreateTaskRequest, UpdateTaskRequest } from "../domain/taskDomain";
import { CreatetTaskRepository, DeleteTaskRepository, GetAllTaskRepository, TaskDetailsRepository, UpdateTaskRepository} from "../repository/taskRepository";

export async function CreateTaskUsecase(request: CreateTaskRequest) {
    return await CreatetTaskRepository(request);
}

export async function DeleteTaskUsecase(external_id: string, userId?: number) {
    console.log("Inside delete usecase");
    let response = await DeleteTaskRepository(external_id, userId);
    if (response) {
        return true;
    }
    return false;
}

export async function UpdateTaskUsecase(request: UpdateTaskRequest) {
    return await UpdateTaskRepository(request);
}

export async function GetAllTaskUsecase(userId?: number) {
    return await GetAllTaskRepository(userId);
}

export async function TaskDetailsUsecase(external_id: string, userId?: number) {
    console.log("Inside task details usecase");
    return await TaskDetailsRepository(external_id, userId);
}