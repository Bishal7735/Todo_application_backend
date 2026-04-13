import { RegistrationRequest } from "../domain/authDomain";
import { User } from "../models";

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
        external_id: "externalId",
        first_name: request.firstName,
        last_name: request.lastName,
        email: request.email,
        mob_no: request.mobNumber,
        password: request.password,
        status: "Active",
    }
    // Table insert
    await User.create(userObject);
    console.log("User Created successfully", userObject);
    return true;
}


export async function EmailCheck(email: string) {
    const users = await User.findAll({
        where: {
            email: email,
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