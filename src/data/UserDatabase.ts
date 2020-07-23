import { BaseDatabase } from './BaseDatabase'
import { User, UserRole } from '../model/User'

export class UserDatabase extends BaseDatabase {
    public static TABLE_NAME: string = 'NavedexUser';

    private toModel(dbResult?: any): User | undefined {
        return (
            dbResult && new User(
                dbResult.id,
                dbResult.email,
                dbResult.password,
                dbResult.role,
                dbResult.name,
                dbResult.birthday,
                dbResult.job_role,
                dbResult.admission_date,
                dbResult.projects
            )
        )
    }
    public async createUserAdmin(user: User): Promise<void> {
        await this.connection()
            .insert({
                id: user.getId(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            })
            .into(UserDatabase.TABLE_NAME)
    }
    public async createUserNaver(user: User): Promise<void> {
        await this.connection()
            .insert({
                id: user.getId(),
                name: user.getName(),
                role: user.getRole(),
                birthday: user.getbirthday(),
                job_role: user.getJobRole(),
                admission_date: user.getAdmissionDate(),
                projects: user.getProjects()
            })
            .into(UserDatabase.TABLE_NAME)
    }
    public async getUserById(id: string): Promise<User | undefined> {
        const result = await this.connection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ id })
        return this.toModel(result[0])
    }
    public async getUserByEmail(email: string): Promise<User | undefined> {
        const result = await this.connection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ email })
        return this.toModel(result[0])
    }
    public async getAllUsers(jobRole: string): Promise<User[]> {
        const result = await this.connection().raw(`
        SELECT 
        *
        FROM ${UserDatabase.TABLE_NAME}
        WHERE job_role = "${jobRole}"`);
        return result 
    }
}