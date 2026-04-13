import { User } from "../models";
import { RegistrationRequest } from "../domain/authDomain";

export async function Emailcheck(email: string) {
    const existingUser = await User.findOne({
        where: { email: email }
    });

    if (existingUser) {
        return true;
    }
    else {
        return false;
    }
}

export async function RegisterRepository(request: RegistrationRequest) {
    const newUser = await User.create({
        first_name: request.firstName,
        last_name: request.lastName,
        mob_no: request.mobNumber,
        email: request.email,
        password: request.password
    });
    return newUser;
}