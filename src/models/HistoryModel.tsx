import {HistoryProps} from "../sections/History/history-table-row";

export class HistoryModel {
    id: number;
    title: string;
    content: string;
    image?: string;
    notifyAdmin: boolean;
    seen: boolean;
    date: Date;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        title: string,
        content: string,
        available: boolean,
        date: Date,
        notifyAdmin: boolean = false,
        seen: boolean = false,
        image?: string,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.image = image;
        this.notifyAdmin = notifyAdmin;
        this.seen = seen;
        this.date = date;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJson(json: any): HistoryModel {
        return new HistoryModel(
            json.id,
            json.title,
            json.content,
            json.available,
            new Date(json.date),
            json.notifyAdmin ?? false,
            json.seen ?? false,
            json.image ?? undefined,
            new Date(json.createdAt),
            new Date(json.updatedAt)
        );
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
            image:( this.image)?this.image:'https://example.com/avatar.jpg',
        };
    }
}
