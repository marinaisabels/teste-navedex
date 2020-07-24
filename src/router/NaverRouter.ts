import express from "express";
import { NaverController } from "../controller/NaverController";


export const naverRouter = express.Router();

const naverController = new NaverController()

naverRouter.post("/register", naverController.signupNaver);

naverRouter.get("/navers", naverController.getAllNavers);
naverRouter.get("/details", naverController.getNaversDetails);

naverRouter.put("/edit", naverController.editNaver);

naverRouter.delete("/delete", naverController.deleteNaver)