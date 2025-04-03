import { GymModel } from "./GymModel";

export class ReminderModel {
    id?: number;

    title: string;

    description: string;

    reminderDate: Date;

    available: boolean;

    createdAt: Date;

    updatedAt: Date;

    gym: GymModel;

    constructor({
                    id,
                    title,
                    description,
                    reminderDate,
                    available,
                    createdAt,
                    updatedAt,
                    gym,
                }: {
        id?: number;
        title: string;
        description: string;
        reminderDate: Date;
        available: boolean;
        createdAt: Date;
        updatedAt: Date;
        gym: GymModel;
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.reminderDate = reminderDate;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.gym = gym;
    }

    static fromJson(json: any): ReminderModel {
        return new ReminderModel({
            id: json.id,
            title: json.title,
            description: json.description,
            reminderDate: new Date(json.reminderDate),
            available: json.available,
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
            gym: GymModel.fromJson(json.gym),
        });
    }

    toJson(): any {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            reminderDate: this.reminderDate.toISOString(),
            available: this.available,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            gym: this.gym.toJson(),
        };
    }
}
