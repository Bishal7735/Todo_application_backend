import { Router } from "express";
import { authRouter } from "./auth";
import { userRouter } from "./users";
import {taskRouter} from "./task";

export let router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/task', taskRouter);