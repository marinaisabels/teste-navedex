import express from "express";
import { ProjectController } from "../controller/ProjectController";


export const projectRouter = express.Router();

const projectController = new ProjectController()

projectRouter.post("/register", projectController.createProject);

projectRouter.get("/projects", projectController.getAllProjects);
projectRouter.get("/details", projectController.getProjectDetails);

projectRouter.put("/edit", projectController.editNaver);

projectRouter.delete("/delete", projectController.deleteProjectf)