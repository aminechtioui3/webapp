import {ArticleProps} from "../sections/Articles/article-table-row";

export class ArticleModel {
    id: number | null;
    title: string;
    description: string;
    header: string;
    image: string | null;
    video: string | null;
    date: Date;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number | null,
        title: string,
        description: string,
        header: string,
        image: string | null = null,
        video: string | null = null,
        date: Date,
        available: boolean,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.header = header;
        this.image = image;
        this.video = video;
        this.date = date;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Method to convert the object to JSON
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
        };
    }

    // Static method to create an object from JSON
    static fromJson(json: any): ArticleModel {
        return new ArticleModel(
            json.id ?? null,
            json.title,
            json.description,
            json.header,
            json.image ?? null,
            json.video ?? null,
            new Date(json.date),
            json.available,
            new Date(json.createdAt),
            new Date(json.updatedAt)
        );
    }

    toArticleProps(): ArticleProps {
        return {
            id: this.id,
            date:this.date,
            header:this.header,
            name: this.title,
            status: this.available,
            image:( this.image)?this.image:'https://example.com/avatar.jpg',
            description: this.description, // Consider making this a boolean instead of a string
        };
    }
}
