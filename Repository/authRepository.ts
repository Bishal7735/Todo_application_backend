import { LoginRequest, RegistrationRequest } from "../domain/authDomain";
import logger from "../logger";
import { User } from "../models";
import bcrypt from "bcrypt";


export async function LoginRepository(request: LoginRequest) {
    logger.info("Inside LoginRepository");
    const normalizedEmail = (request.email || "").trim().toLowerCase();

    const user:any = await User.findOne({
        where: { email: normalizedEmail },
    });

    if (!user) {
        logger.warn("Login failed: User not found for email " + normalizedEmail);
        return "";
    }

    const isMatch = await bcrypt.compare(request.password, user.password);
    if (isMatch){
        return user;
    } else {
        logger.warn("Login failed: Invalid password for email " + normalizedEmail);
        return "";
    }
}

export async function RegisterRepository(request: RegistrationRequest) {
    let externalId: string = "";
    let exists = true;
    while (exists) {
        externalId = generateRandomString(10);
        const record = await User.findOne({
            where: { external_id: externalId },
        });
        exists = !!record;
    }
    
    let userObject = {
        external_id: externalId,
        first_name: request.firstName,
        last_name: request.lastName,
        email: (request.email || "").trim().toLowerCase(),
        mob_no: request.mobNumber,
        password: request.password,
        status: "Active",
    }

    // Table insert
    const createdUser: any = await User.create(userObject);
    logger.debug("User Created successfully: " + JSON.stringify(userObject));
    return createdUser;
}

export async function EmailCheck(email: string) {
    const normalizedEmail = (email || "").trim().toLowerCase();
    const users = await User.findAll({
        where: {
            email: normalizedEmail,
        },
    });
    if (users.length > 0) {
        return false;
    } else {
        return true;
    }
}

export function generateRandomString(length: number = 10): string {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}