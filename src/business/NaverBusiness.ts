import { NaverDatabase } from "../data/NaverDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { Naver, UserRole, stringToUserRole } from "../model/Naver";


export class NaverBusiness {
    constructor(
        private naverDatabase: NaverDatabase,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ) { }

    public async signupNaver(name: string, birthday: string, job_role: string, admission_date: number, projects: string, email?: string, password?: string) {
        if (!name || !birthday) {
            throw new Error("Invalid Params");
        }

        const role = UserRole.NAVER

        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const naver = new Naver(id, name, stringToUserRole(role), birthday, job_role, admission_date, projects)

        const naverDatabase = new NaverDatabase()
        await naverDatabase.createNaver(naver)

        return {
            id: id,
            role: role
        }
    }

    public async getAllNavers(token: string) {
        const authenticator = new Authenticator()
        const naverData = authenticator.verify(token)

        const naverDatabase = new NaverDatabase();
        const userNaver = await naverDatabase.getNaverById(naverData.id)

        const usersNave = await this.naverDatabase.getAllNavers()

        return usersNave.map(userNaver => ({
            id: userNaver?.getId(),
            name: userNaver?.getName(),
            birthday: userNaver?.getbirthday(),
            admission_date: userNaver?.getAdmissionDate(),
            job_role: userNaver?.getJobRole(),
            projects: userNaver.getProjects()
        }))
    }
    public async getNaversDetails(token: string) {
        const authenticator = new Authenticator()
        const naverData = authenticator.verify(token)

        const naverDatabase = new NaverDatabase();
        const userNaver = await naverDatabase.getNaverById(naverData.id)

        const usersNave = await this.naverDatabase.getNaverDetails()

        return usersNave.map(userNaver => ({
            id: userNaver?.getId(),
            name: userNaver?.getName(),
            birthday: userNaver?.getbirthday(),
            admission_date: userNaver?.getAdmissionDate(),
            job_role: userNaver?.getJobRole(),
            projects: userNaver.getProjects()
        }))
    }
    public async editNaver(token: string, id: string, name: string, birthday: string, admission_date: number, job_role: string, projects: string) {
        const authenticator = new Authenticator()
        const naverData = authenticator.verify(token)

        const naverDatabase = new NaverDatabase()
        const userNaver = await this.naverDatabase.getNaverById(naverData.id)

        const usersNave = await naverDatabase.editNaver(id, name, birthday, admission_date, job_role, projects)

        return usersNave
    }
    public async deleteNaver(token: string, id: string) {
        const authenticator = new Authenticator()
        const naverData = authenticator.verify(token)

        const naverDatabase = new NaverDatabase()
        const userNaver = await this.naverDatabase.getNaverById(naverData.id)

        const usersNave = await naverDatabase.deleteNaver(id)

        return usersNave
    }
}
