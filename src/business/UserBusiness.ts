import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { User, UserRole, stringToUserRole } from "../model/User";
import { PassThrough } from "stream";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ){}

    public async signup(email: string, password: string){
        if(!email || !password){
            throw new Error("Invalid Params, try again!");
        }
        if(email.indexOf("@") === -1){
            throw new Error("Invalid email!");
        }

        const role = UserRole.ADMIN 

        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)

        const user = new User(id, email, hashPassword, stringToUserRole(role))

        const userDatabase = new UserDatabase()
        await userDatabase.createUserAdmin(user)

        return{
            id: id,
            role: role
        }
    }

    public async signupNaver(name: string, birthday: string, job_role: string, admission_date: number, projects:string, email?: string, password?: string){
        if(!name|| !birthday){
            throw new Error("Invalid Params");     
        }

        const role = UserRole.NAVER

        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const user = new User(id, email, password, name, stringToUserRole(role), birthday, job_role, admission_date, projects)

        const userDatabase = new UserDatabase()
        await userDatabase.createUserNaver(user)

        return {
            id:id, 
            role: role
        }
    }

    public async login(email: string, password: string){
        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserByEmail(email)

        if(!user){
            throw new Error("Invalid Params");
        }

        if(!email || !password){
            throw new Error("Invalid Params!");
        }

        const hashManager = new HashManager()
        const comparePasswords = await hashManager.compare(password, user.getPassword())

        if(!comparePasswords){
            throw new Error("Invalid Information");
        }

        const authenticator = new Authenticator()   
        const acessToken = authenticator.generationToken(
            {
                id: user.getId(),
                role: user.getRole()
            },
            process.env.ACCESS_TOKEN_EXPIRES_IN
        )
        return {
            acessToken,  
        }
    }

    public async getAllNavers(token: string){
        const authenticator = new Authenticator()
        const naverData = authenticator.verify(token)

        const userDatabase = new UserDatabase();
        await userDatabase.getAllUsers(token)

        
    }
}