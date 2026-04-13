export interface RegistrationRequest {
    firstName: string;
    lastName: string;
    mobNumber: number;
    email: string;
    password: string;
}

export interface HashRequest {
    password: string;
    salt: number;
}