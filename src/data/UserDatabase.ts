import { BaseDatabase } from './BaseDatabase'
import { User, UserRole } from '../model/User'

export class UserDatabase extends BaseDatabase {
    public static TABLE_NAME: string = 'User';

    private toModel(dbResult?: any): User | undefined {
        return (
            dbResult && new User(
                dbResult.id,
                dbResult.email,
                dbResult.password,
                dbResult.role,
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
    public async getAllUsers(): Promise<User[]> {
        const result = await super.connection().raw(`
            SELECT * 
            FROM ${UserDatabase.TABLE_NAME}
            WHERE role = "NAVER" 
        `)
        return result[0].map((res: any) => this.toModel(res))
    }
}