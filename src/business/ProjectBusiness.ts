import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { Project } from "../model/Project";
import { ProjectDatabase } from "../data/ProjectDatabase";


export class ProjectBusiness {
    constructor(
        private projectDatabase: ProjectDatabase,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ){}

    public async createProject( name: string){
      
        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const prod = new Project(id, name)

        const projectDatabase = new ProjectDatabase()
        await projectDatabase.createProject(prod)

        return{
            id: id
        }
    }
    public async getAllProjects(token: string) {
        const authenticator = new Authenticator()
        const data = authenticator.verify(token)

        const projectDatabase = new ProjectDatabase();
        const naverProject = await projectDatabase.getProjectById(data.id)

        const projects = await this.projectDatabase.getAllProjects()

        return projects.map(neverProject => ({
            id: neverProject?.getId(),
            name: neverProject?.getName()
        }))
    }
    public async getProjectsDetails(token: string) {

        //AINDA NÃO ESTÁ PRONTO!!!!!!!!!!!!!!!!!!!!!
        const authenticator = new Authenticator()
        const data = authenticator.verify(token)

        const projectDatabase = new ProjectDatabase();
        const naverProject = await projectDatabase.getProjectById(data.id)

        const projects = await this.projectDatabase.getAllProjects()

        return  projects 
    }
    public async editProject(token: string, id: string, name: string) {
        const authenticator = new Authenticator()
        const data = authenticator.verify(token)

        const projectDatabase = new ProjectDatabase();
        const naverProject = await projectDatabase.getProjectById(data.id)


        const project = await projectDatabase.editProject(id, name)

        return project
    }
    public async deleteProject(token: string, id: string) {
        const authenticator = new Authenticator()
        const data = authenticator.verify(token)

        const projectDatabase = new ProjectDatabase();
        const naverProject = await projectDatabase.getProjectById(data.id)

        const projectNave = await projectDatabase.deleteProject(id)

        return projectNave
    }
   
}