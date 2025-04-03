import { GymModel } from "./GymModel";

import type { ArticleProps } from "../sections/Articles/article-table-row";

export class ArticleModel {
    id: number;

    title: string;

    description: string;

    header: string;

    image?: string;

    video?: string;

    date: Date;

    available: boolean;

    createdAt: Date;

    updatedAt: Date;

    gym: GymModel;

    constructor({
                    id,
                    title,
                    description,
                    header,
                    date,
                    available,
                    createdAt,
                    updatedAt,
                    gym,
                    image,
                    video,
                }: {
        id: number;
        title: string;
        description: string;
        header: string;
        date: Date;
        available: boolean;
        createdAt: Date;
        updatedAt: Date;
        gym: GymModel;
        image?: string;
        video?: string;
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.header = header;
        this.date = date;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.gym = gym;
        this.image = image;
        this.video = video;
    }

    static fromJson(json: any): ArticleModel {
        return new ArticleModel({
            id: json.id,
            title: json.title,
            description: json.description,
            header: json.header,
            date: new Date(json.date),
            available: json.available,
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
            gym: GymModel.fromJson(json.gym),
            image: json.image,
            video: json.video,
        });
    }

    toJson(): any {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            header: this.header,
            image: this.image,
            video: this.video,
            date: this.date.toISOString(),
            available: this.available,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            gym: this.gym.toJson(),
        };
    }

    toArticleProps(): ArticleProps {
        return {
            id: this.id ?? undefined,
            date: this.date,
            header: this.header,
            title: this.title,
            status: this.available,
            image: this.image ? this.image : 'https://example.com/avatar.jpg',
            description: this.description, // Consider making this a boolean instead of a string
        };
    }
}
