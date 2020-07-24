export class User {
    constructor(
        private id: string,
        private email?: string,
        private password?: string,
        private role?: string
    ) { }

    public getId(): string {
        return this.id;
    }
    public getEmail(): string {
        return this.email as string;
    }
    public getPassword(): string {
        return this.password as string;
    }
    public getRole(): UserRole {
        return this.role as UserRole;
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

