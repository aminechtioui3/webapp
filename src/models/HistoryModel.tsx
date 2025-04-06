// eslint-disable-next-line import/no-cycle
import { GymModel } from "./GymModel";

import type { HistoryProps } from "../sections/History/history-table-row";

export class HistoryModel {
    id: number;

    title: string;

    content: string;

    image?: string;

    notifyAdmin: boolean;

    seen: boolean;

    date: Date;

    gym: GymModel;

    available: boolean;

    createdAt: Date;

    updatedAt: Date;

    constructor({
                    id,
                    title,
                    content,
                    date,
                    gym,
                    available,
                    createdAt,
                    updatedAt,
                    image = undefined,
                    notifyAdmin = false,
                    seen = false,
                }: {
        id: number;
        title: string;
        content: string;
        date: Date;
        gym: GymModel;
        available: boolean;
        createdAt: Date;
        updatedAt: Date;
        image?: string;
        notifyAdmin?: boolean;
        seen?: boolean;
    }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.image = image;
        this.notifyAdmin = notifyAdmin;
        this.seen = seen;
        this.date = date;
        this.gym = gym;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJson(json: any): HistoryModel {
        return new HistoryModel({
            id: json.id,
            title: json.title,
            content: json.content,
            date: new Date(json.date),
            gym: GymModel.fromJson(json.gym),
            available: json.available,
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
            image: json.image,
            notifyAdmin: json.notifyAdmin,
            seen: json.seen,
        });
    }

    toJson(): any {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            image: this.image,
            notifyAdmin: this.notifyAdmin,
            seen: this.seen,
            date: this.date.toISOString(),
            gym: this.gym.toJson(),
            available: this.available,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }

    toHistoryProps(): HistoryProps {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            seen: this.seen,
            date: this.date,
            notifyAdmin:this.notifyAdmin,
            image: this.image ?? 'https://example.com/avatar.jpg',
        };
    }
}
