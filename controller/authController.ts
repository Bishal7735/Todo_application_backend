import { Request, Response } from 'express';

export async function Login(req: Request, res: Response) {
    console.log('Inside login controller');
    console.log('Got the request body for the api call', req.body);
    console.log('Got the request header for the api call', req.headers['content-type']);

    res.send(req.body);
}

export async function Register(req: Request, res: Response) {
    console.log('Inside Register controller');
    console.log('Got the request body for the api call', req.body);
    var user;
    res.send(req.body);
}