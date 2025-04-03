import { GymModel } from "./GymModel";

export class CommunityModel {
    id?: number;

    name: string;

    description: string;

    gym: GymModel;

    status: boolean;

    createdAt: Date;

    updatedAt: Date;

    constructor({
                    id,
                    name,
                    description,
                    gym,
                    status,
                    createdAt,
                    updatedAt,
                }: {
        id?: number;
        name: string;
        description: string;
        gym: GymModel;
        status: boolean;
        createdAt: Date;
        updatedAt: Date;
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.gym = gym;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJson(json: any): CommunityModel {
        return new CommunityModel({
            id: json.id,
            name: json.name,
            description: json.description,
            gym: GymModel.fromJson(json.gym),
            status: json.status,
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
        });
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            gym: this.gym.toJson(),
            status: this.status,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}
