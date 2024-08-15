export class ClientType {
    id: string;
    name: string
    constructor(id: string) {
        this.id = id;
        this.name = id.toLocaleUpperCase();
    }
}