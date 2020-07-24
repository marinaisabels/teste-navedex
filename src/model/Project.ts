export class Project {
    constructor(
        private id: string,
        private name: string,
        private  navers: string
    ) { }

    public getId(): string {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public getNavers(): string {
        return this.navers;
    }
}





