export class GymModel {
    id: number;

    name: string;

    constructor({ id, name }: { id: number; name: string }) {
        this.id = id;
        this.name = name;
    }

    static fromJson(json: any): GymModel {
        return new GymModel({
            id: json.id,
            name: json.name,
        });
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
        };
    }
}
