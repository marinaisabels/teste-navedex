import { BaseDatabase } from './BaseDatabase'
import { Project } from '../model/Project'

export class ProjectDatabase extends BaseDatabase {
    public static TABLE_NAME: string = 'ProjectsNave';

    private toModel(dbResult?: any): Project | undefined {
        return (
            dbResult && new Project(
                dbResult.id,
                dbResult.name
            )
        )
    }
    public async createProject(project: Project): Promise<void> {
        await this.connection()
            .insert({
                id: project.getId(),
                name: project.getName(),
            })
            .into(ProjectDatabase.TABLE_NAME)
    }

    public async getProjectById(id: string): Promise<Project | undefined> {
        const result = await this.connection()
            .select("*")
            .from(ProjectDatabase.TABLE_NAME)
            .where({ id })
        return this.toModel(result[0])
    }
    public async getAllProjects(): Promise<Project[]> {
        const result = await super.connection().raw(`
            SELECT * 
            FROM ${ProjectDatabase.TABLE_NAME} 
        `)
        return result[0].map((res: any) => this.toModel(res))
    }
    public async editProject(id: string, name: string): Promise<any | undefined> {
        await super.connection().raw(`
            UPDATE ${ProjectDatabase.TABLE_NAME}
            SET name = "${name}", 
            WHERE id = "${id}";  
        `)
    }
    public async deleteProject(id: string): Promise<void> {
        await super.connection().raw(`
        DELETE FROM ${ProjectDatabase.TABLE_NAME}
        WHERE id = "${id}";
        `)
    }
}