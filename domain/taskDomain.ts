export interface TaskTableAttributes {
    id: number;
    external_id: string;
    name: string;
    description: string;
    status: string;
    due_date: Date;
    notes:string;
    createdBy: string;
    updatedBy:string;
    createdAt: Date;
    updatedAt: Date;
    priority:string;
}

export interface CreateTaskRequest {
    priority: any;
    status: any;
    name:string;
    description:string;
    due_date:Date;
    notes:string
}

export interface UpdateTaskRequest {
    external_id: string;
    name: string;
    description: string;
    notes: string;
    due_date: string;
    status: string;
    priority: string;
}
export interface TaskDetailsRequest{
   external_id: string;
    name: string;
    description: string;
    due_date: Date;
    notes:string;
    createdBy: string;
    updatedBy:string;
    createdAt: Date;
    updatedAt: Date;
}