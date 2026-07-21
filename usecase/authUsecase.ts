import { HashRequest, LoginRequest, RegistrationRequest } from "../domain/authDomain";
import logger from "../logger";
import { EmailCheck, generateRandomString, LoginRepository, RegisterRepository } from "../repository/authRepository";
import bcrypt from "bcrypt";
// import jwt from 'jsonwebtoken';
const jwt = require("jsonwebtoken");


export async function LoginUsecase(request: LoginRequest) {
    request.email = (request.email || "").trim().toLowerCase();
    let user = await LoginRepository(request);
    if (user === "") {
        return false;
    } else {
        const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.email;
        let user_obj = {
            "id": user.id,
            "userId": user.id,
            "externalId": user.external_id,
            "email": user.email,
            "name": fullName,
        }

        let accessTokenSecret = process.env.ACCESSTOKENSECRET || "jnkjsjv";
        const accessTokenExp = (process.env.ACCESSTOKENEXPTIME && process.env.ACCESSTOKENEXPTIME !== '1m') ? process.env.ACCESSTOKENEXPTIME : '7d';
        const refreshTokenExp = (process.env.REFRESHTOKENEXPTIME && process.env.REFRESHTOKENEXPTIME !== '1h') ? process.env.REFRESHTOKENEXPTIME : '30d';

        logger.info("ACCESSTOKENSECRET", accessTokenSecret);
        const accessToken = jwt.sign(user_obj, accessTokenSecret, {
            expiresIn: accessTokenExp,
        });
        let refreshTokenSecret = process.env.REFRESHTOKENSECRET || "jksdjbvs";
        const refreshToken = jwt.sign(user_obj, refreshTokenSecret, {
            expiresIn: refreshTokenExp,
        });
        logger.info("Token created successfully " + accessToken);
        logger.info("Token created successfully " + refreshToken);
        let resp = {
            'token': accessToken,
            'accessToken': accessToken,
            'refreshToken': refreshToken,
            'user': {
                'name': fullName,
                'email': user.email,
                'role': 'User'
            }
        }
        return resp;
    }
}


export async function RegisterUsecase(request: RegistrationRequest) {
    logger.info("Inside RegisterUsecase");
    request.email = (request.email || "").trim().toLowerCase();

    let EmailCheckResponse = await EmailCheck(request.email);

    if (EmailCheckResponse == false) {
        logger.debug("Email Id is already present: ", request.email);
        return false;
    }

    const hashreq: HashRequest = {
        password: request.password,
        salt: 10,
    };

    const hashedPassword = await hashPassword(hashreq);
    request.password = hashedPassword;

    // Save user
    const createdUser: any = await RegisterRepository(request);

    // Generate JWT payload
    const fullName = `${request.firstName || ""} ${request.lastName || ""}`.trim() || request.email;
    const userPayload = {
        id: createdUser?.id,
        userId: createdUser?.id,
        externalId: createdUser?.external_id || generateRandomString(),
        email: request.email,
        name: fullName,
    };

    const accessTokenSecret = process.env.ACCESSTOKENSECRET || "jnkjsjv";
    const refreshTokenSecret = process.env.REFRESHTOKENSECRET || "jksdjbvs";
    const accessTokenExp = (process.env.ACCESSTOKENEXPTIME && process.env.ACCESSTOKENEXPTIME !== '1m') ? process.env.ACCESSTOKENEXPTIME : '7d';
    const refreshTokenExp = (process.env.REFRESHTOKENEXPTIME && process.env.REFRESHTOKENEXPTIME !== '1h') ? process.env.REFRESHTOKENEXPTIME : '30d';

    const accessToken = jwt.sign(
        userPayload,
        accessTokenSecret,
        {
            expiresIn: accessTokenExp,
        }
    );

    const refreshToken = jwt.sign(
        userPayload,
        refreshTokenSecret,
        {
            expiresIn: refreshTokenExp,
        }
    );

    return {
        accessToken,
        refreshToken,
        user: {
            name: fullName,
            email: request.email,
            role: 'User'
        }
    };
}

export async function hashPassword(req: HashRequest): Promise<string> {
    const hash = await bcrypt.hash(req.password, req.salt);
    return hash;
}
