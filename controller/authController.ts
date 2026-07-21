import { Request, Response } from "express";
import { HashRequest, LoginRequest, RegistrationRequest } from "../domain/authDomain";
import { hashPassword, LoginUsecase, RegisterUsecase } from "../usecase/authUsecase";
import logger from "../logger";
import { EmailCheck, generateRandomString, RegisterRepository } from "../repository/authRepository";
const jwt = require("jsonwebtoken");


export async function Login(req:Request, res:Response) {
    logger.info("Inside login controller");
    let request = {} as LoginRequest;
    request.email = req.body.email ? String(req.body.email).trim().toLowerCase() : "";
    request.password = req.body.password;
    logger.debug("after mapping to the user request", request);
    let usecaseResponse = await LoginUsecase(request);
    if (usecaseResponse == false) {
        return res.status(401).json({ message: "Incorrect email or password" });
    } else {
        logger.info("Login successful");
        return res.json(usecaseResponse);
    }
}

export async function Register(req: Request, res: Response) 
{ 
  logger.info('Inside Register controller'); 
  logger.debug('Got the request body for the api call', req.body.first_name); 
  let request = {} as RegistrationRequest;
  request.firstName = req.body.first_name ? String(req.body.first_name).trim() : ""; 
  request.lastName = req.body.last_name ? String(req.body.last_name).trim() : ""; 
  request.mobNumber = req.body.mob_number; 
  request.email = req.body.email ? String(req.body.email).trim().toLowerCase() : ""; 
  request.password = req.body.password;
  logger.debug("after mapping to the user request", request);
  let usecaseResponse = await RegisterUsecase(request); 
  if (usecaseResponse == false) { 
    return res.status(400).json({ message: "Email ID is already registered. Please login to continue." }); 
  } else { 
    return res.json(usecaseResponse);
  } 
}

export const Refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token is required",
      });
    }

  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESHTOKENSECRET!
) as any;

const accessToken = jwt.sign(
    {
        id: decoded.id || decoded.userId,
        userId: decoded.userId || decoded.id,
        externalId: decoded.externalId,
        email: decoded.email,
        name: decoded.name,
    },
    process.env.ACCESSTOKENSECRET || "jnkjsjv",
    {
        expiresIn: process.env.ACCESSTOKENEXPTIME || "7d",
    }
);

    return res.status(200).json({
      accessToken,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};