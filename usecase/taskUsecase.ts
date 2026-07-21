import { CreateTaskRequest, UpdateTaskRequest } from "../Domain/taskDomain";
import { CreatetTaskRepository, DeleteTaskRepository, GetAllTaskRepository, TaskDetailsRepository, UpdateTaskRepository} from "../repository/taskRepository";

export async function CreateTaskUsecase(request: CreateTaskRequest) {
    return await CreatetTaskRepository(request);}

export async function DeleteTaskUsecase(external_id:string) {
    console.log("Inside delete usecase");
let response = await DeleteTaskRepository(external_id);
if (response) {
        return true;
    }

    return false;
}

export async function UpdateTaskUsecase(request:UpdateTaskRequest) {
    return await UpdateTaskRepository(request);
}
export async function GetAllTaskUsecase(){
    return await GetAllTaskRepository();
}

export async function TaskDetailsUsecase(external_id:string) {
    console.log("Inside task details usecase");
return await TaskDetailsRepository(external_id);
}