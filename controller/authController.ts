 import { request, Request, Response } from "express";
 import { HashRequest, LoginRequest, RegistrationRequest } from "../Domain/authDomain" ;
import { hashPassword, LoginUsecase, RegisterUsecase } from "../useCase/authUsecase" ;
import  logger  from "..//logger"
import { EmailCheck, generateRandomString, RegisterRepository } from "../repository/authRepository";
const jwt = require("jsonwebtoken");


export async function Login(req:Request, res:Response) {
    logger.info("Inside login controller");
    let request = {} as LoginRequest;
    request.email = req.body.email;
    request.password = req.body.password;
    logger.debug("after mapping to the user request", request);
    let usecaseResponse = await LoginUsecase(request);
    if (usecaseResponse == false) {
        res.send("Incorrect email or password");
    } else {
        logger.info("Login successful")
       res.send(usecaseResponse);

    }
}

export async function Register(req: Request, res: Response) 
{ 
  logger.info('Inside Register controller'); 
  logger.debug('Got the request body for the api call', req.body.first_name); 
  let request = {} as
   RegistrationRequest;
    request.firstName = req.body.first_name; 
    request.lastName = req.body.last_name; 
    request.mobNumber = req.body.mob_number; 
    console.log(req.body);
console.log(request.mobNumber);
    request.email = req.body.email; 
    request.password = req.body.password;
     logger.debug("after mapping to the user request", request);
      let usecaseResponse = await RegisterUsecase(request); 
      if (usecaseResponse == false)
         { 
          res.send("Email id Already present in our table so plz login to continue."); 
        } 
        else { 
          res.json(usecaseResponse);
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
        externalId: decoded.externalId,
        email: decoded.email,
    },
    process.env.ACCESSTOKENSECRET!,
    {
        expiresIn: process.env.ACCESSTOKENEXPTIME,
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