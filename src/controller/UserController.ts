import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
    private static UserBusiness = new UserBusiness (
        new UserDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator()
    )

    public async signup(req: Request, res: Response){
        const {
            email,
            password
        } = req.body

        try{ 
            const result = await UserController.UserBusiness.signup(email, password)
            res.status(200).send(
                result
            )
        } catch (err){
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }
    public async login(req: Request, res: Response){
        try{
            const{
                email, 
                password
            } = req.body
            
            const result = await UserController.UserBusiness.login(email, password)

            res.status(200).send({
                result
            })
        } catch (err){
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }
}