import express from "express";
import { UserController } from "../controller/UserController";


export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signup);
userRouter.post("/register-naver", userController.signupNaver);
userRouter.post("/login", userController.login);

userRouter.get("/navers", userController.getAllNavers);