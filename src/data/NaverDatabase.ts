import { BaseDatabase } from './BaseDatabase'
import { Naver, UserRole } from '../model/Naver'

export class NaverDatabase extends BaseDatabase {
    public static TABLE_NAME: string = 'Naver';

    private toModel(dbResult?: any): Naver | undefined {
        return (
            dbResult && new Naver(
                dbResult.id,
                dbResult.name,
                dbResult.role,
                dbResult.birthday,
                dbResult.job_role,
                dbResult.admission_date,
                dbResult.projects
            )
        )
    }
    public async createNaver(naver: Naver): Promise<void> {
        await this.connection()
            .insert({
                id: naver.getId(),
                name: naver.getName(),
                role: naver.getRole(),
                birthday: naver.getbirthday(),
                job_role: naver.getJobRole(),
                admission_date: naver.getAdmissionDate(),
                projects: naver.getProjects()
            })
            .into(NaverDatabase.TABLE_NAME)
    }
    public async getNaverById(id: string): Promise<Naver | undefined> {
        const result = await this.connection()
            .select("*")
            .from(NaverDatabase.TABLE_NAME)
            .where({ id })
        return this.toModel(result[0])
    }

    public async getAllNavers(): Promise<Naver[]> {
        const result = await super.connection().raw(`
            SELECT * 
            FROM ${NaverDatabase.TABLE_NAME}
            WHERE role = "NAVER" 
        `)
        return result[0].map((res: any) => this.toModel(res))
    }
    public async getNaverDetails(): Promise<Naver[]> {
        const result = await super.connection().raw(`
            SELECT * 
            FROM ${NaverDatabase.TABLE_NAME} 
        `)
        return result[0].map((res: any) => this.toModel(res))
    }
    public async createNaverProject(naver: Naver): Promise<void> {
        await this.connection()
            .insert({
                id: naver.getId(),
                name: naver.getName(),
            })
            .into(NaverDatabase.TABLE_NAME)
    }
    public async getNaverProjects(): Promise<Naver[]> {
        const result = await super.connection().raw(`
            SELECT * 
            FROM ${NaverDatabase.TABLE_NAME} 
            WHERE projects
        `)
        return result[0].map((res: any) => this.toModel(res))
    }
    public async editNaver(id: string, name: string, birthday: string, admission_date: number, job_role: string, projects: string): Promise<any | undefined> {
        await super.connection().raw(`
            UPDATE ${NaverDatabase.TABLE_NAME}
            SET name = "${name}", 
                birthday = "${birthday}", 
                admission_date = "${admission_date}", 
                job_role = "${job_role}", 
                projects = "${projects}"
            WHERE id = "${id}";  
        `)
    }
    public async deleteNaver(id: string): Promise<void> {
        await super.connection().raw(`
        DELETE FROM ${NaverDatabase.TABLE_NAME}
        WHERE id = "${id}";
        `)
    }
}