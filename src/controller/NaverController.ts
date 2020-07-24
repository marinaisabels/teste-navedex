import { Request, Response } from "express";
import { NaverDatabase } from "../data/NaverDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { NaverBusiness } from "../business/NaverBusiness";

export class NaverController {
    private static NaverBusiness = new NaverBusiness(
        new NaverDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator()
    )

    public async signupNaver(req: Request, res: Response) {
        const {
            name,
            birthday,
            job_role,
            admission_date,
            projects
        } = req.body

        try {
            const result = await NaverController.NaverBusiness.signupNaver(name, birthday, job_role, admission_date, projects)
            res.status(200).send({
                result,
                message: "Naver criado com sucesso!"
            })
        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }
    public async getAllNavers(req: Request, res: Response) {
        const token = req.headers.authorization as string;
        try {
            const result = await NaverController.NaverBusiness.getAllNavers(token)
            res.status(200).send(
                result
            )
        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }
    public async getNaversDetails(req: Request, res: Response) {
        const token = req.headers.authorization as string;
        try {
            const result = await NaverController.NaverBusiness.getNaversDetails(token)
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
            name,
            birthday,
            job_role,
            admission_date,
            projects
        } = req.body
        try {
            const result = await NaverController.NaverBusiness.editNaver(token, id, name, birthday, admission_date, job_role, projects)
            res.status(201).send({
                result,
                message: "Naver atualizado com sucesso!"
            })
        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }

    public async deleteNaver(req: Request, res: Response) {
        const token = req.headers.authorization as string;
        const {
            id
        } = req.body

        try {
            const result = await NaverController.NaverBusiness.deleteNaver(token, id)
            res.status(200).send({
                result,
                message: "Naver excluído com sucesso!"
            })
        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }
}