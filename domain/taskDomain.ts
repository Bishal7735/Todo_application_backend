export interface TaskTableAttributes {
    id: number;
    external_id: string;
    name: string;
    description?: string;
    status: string;
    due_date?: Date | string | null;
    notes?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    priority?: string;
}

export interface CreateTaskRequest {
    priority?: any;
    status?: any;
    name: string;
    description?: string;
    due_date?: Date | string | null;
    notes?: string;
    userId?: number;
}

export interface UpdateTaskRequest {
    external_id: string;
    name?: string;
    description?: string;
    notes?: string;
    due_date?: Date | string | null;
    status?: string;
    priority?: string;
    userId?: number;
}

export interface TaskDetailsRequest {
    external_id: string;
    name?: string;
    description?: string;
    due_date?: Date | string | null;
    notes?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId?: number;
}