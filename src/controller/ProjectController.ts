import { Request, Response } from "express";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { ProjectBusiness } from "../business/ProjectBusiness";
import { ProjectDatabase } from "../data/ProjectDatabase";

export class ProjectController {
    private static ProjectBusiness = new ProjectBusiness(
        new ProjectDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator()
    )

    public async createProject(req: Request, res: Response) {
        const {
            name,
            navers
        } = req.body

        try {
            const result = await ProjectController.ProjectBusiness.createProject(name, navers)
            res.status(200).send({
                result,
                message: "Projeto criado com sucesso!"
            })
        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }
    public async getAllProjects(req: Request, res: Response) {
        const token = req.headers.authorization as string;
        try {
            const result = await ProjectController.ProjectBusiness.getAllProjects(token)
            res.status(200).send(
                result
            )
        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }
    public async getProjectDetails(req: Request, res: Response) {
        const token = req.headers.authorization as string;
        try {
            const result = await ProjectController.ProjectBusiness.getProjectsDetails(token)
            res.status(200).send(
                result
            )
        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }
    public async editNaver(req: Request, res: Response) {
        const token = req.headers.authorization as string;

        const {
            id,
            name
        } = req.body
        try {
            const result = await ProjectController.ProjectBusiness.editProject(token, id, name)
            res.status(201).send({
                result,
                message: "Projeto atualizado com sucesso!"
            })
        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }

    public async deleteProjectf(req: Request, res: Response) {
        const token = req.headers.authorization as string;
        const {
            id
        } = req.body

        try {
            const result = await ProjectController.ProjectBusiness.deleteProject(token, id)
            res.status(200).send({
                result,
                message: "Projeto excluído com sucesso!"
            })
        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }
}