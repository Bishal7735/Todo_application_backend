import { Request, Response } from 'express';
import { LoginRequest, RegistrationRequest } from '../domain/authDomain'
import { LoginUsecase, RegisterUsecase } from "../usecase/authUsecase"

export async function Login(req: Request, res: Response) {
    console.log('Inside login controller');
    let request = {} as LoginRequest;
    request.email = req.body.email;
    request.password = req.body.password;
    console.log("after mapping to the user request", request);
    let usecaseResponse = await LoginUsecase(request);
    if (usecaseResponse == false) {
        res.send("Incorrect email or password");
    } else {
        res.send("Login successful");
    }
}

export async function Register(req: Request, res: Response) {
    console.log('Inside Register controller');
    console.log('Got the request body for the api call', req.body.first_name);
    let request = {} as RegistrationRequest;
    request.firstName = req.body.first_name;
    request.lastName = req.body.last_name;
    request.mobNumber = req.body.mob_number;
    request.email = req.body.email;
    request.password = req.body.password;
    console.log("after mapping to the user request", request)
    let usecaseResponse = await RegisterUsecase(request);
    if (usecaseResponse == false) {
        res.send("Email id Already present in our table so plz login to continue.");
    } else {
        res.send("Registration successful");
    }
}
