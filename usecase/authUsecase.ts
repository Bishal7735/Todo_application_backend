import { HashRequest, RegistrationRequest } from "../domain/authDomain";
import { EmailCheck, generateRandomString, RegisterRepository } from "../Repository/authRepository";
import bcrypt from "bcrypt";

export async function RegisterUsecase(request: RegistrationRequest) {
    console.log("Inside RegisterUsecase");
    let EmailCheckResponse = await EmailCheck(request.email);
    if (EmailCheckResponse == false) {
        console.log("Email Id is already present: ", request.email);
        return false;
    } else {
        // Password Hash
        let hashreq: HashRequest = {
            password: request.password,
            salt: 10
        }
        let hashedPassword = await hashPassword(hashreq);
        console.log("Hashed value is ", hashedPassword);
        request.password = hashedPassword;
        RegisterRepository(request)
    }

}

export async function hashPassword(req: HashRequest): Promise<string> {
    const hash = await bcrypt.hash(req.password, req.salt);
    return hash;
}