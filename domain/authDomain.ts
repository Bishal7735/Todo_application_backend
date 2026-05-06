export interface RegistrationRequest {
    firstName: string;
    lastName: string;
    mobNumber: number;
    email: string;
    password: string;
}
export interface UserTableAttributes {
    id: number;
    external_id: string;
    first_name: string;
    last_name: string;
    email: string;
    mob_no: number;
    status: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface LoginRequest {
    email: string;
    password: string;
}

export interface HashRequest {
    password: string,
    salt: number,
}