export class User {
    constructor(
        private id: string,
        private email?: string,
        private password?: string,
        private name?: string,
        private role?: UserRole,
        private birthday?: string,
        private job_role?: string,
        private admission_date?: number,
        private projects?: string
    ) { }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name as string;
    }
    public getEmail(): string {
        return this.email as string;
    }
    public getbirthday(): string {
        return this.birthday as string;
    }

    public getPassword(): string {
        return this.password as string;
    }

    public getRole(): UserRole {
        return this.role as UserRole;
    }

    public getJobRole(): string {
        return this.job_role as string;
    }

    public getAdmissionDate(): number {
        return this.admission_date as number;
    }
    public getProjects(): string {
        return this.projects as string;
    }
}

export enum UserRole {
    ADMIN = "ADMIN", 
    NAVER = "NAVER"
}

export const stringToUserRole = (input: string): UserRole => {
    switch (input) {
        case "NAVER":
            return UserRole.NAVER;
        case "ADMIN":
            return UserRole.ADMIN;
        default:
            throw new Error("Opção inválida");
    }
};

