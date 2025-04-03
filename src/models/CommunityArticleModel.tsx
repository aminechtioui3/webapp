import { UserAccount } from "./UserAccount";

export class CommunityArticleModel {
    id?: number;

    title: string;

    description: string;

    image?: string;

    available: boolean;

    creator: UserAccount;

    createdAt: Date;

    updatedAt: Date;

    constructor({
                    id,
                    title,
                    description,
                    image,
                    available,
                    creator,
                    createdAt,
                    updatedAt,
                }: {
        id?: number;
        title: string;
        description: string;
        image?: string;
        available: boolean;
        creator: UserAccount;
        createdAt: Date;
        updatedAt: Date;
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.available = available;
        this.creator = creator;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJson(json: any): CommunityArticleModel {
        return new CommunityArticleModel({
            id: json.id,
            title: json.title,
            description: json.description,
            image: json.image,
            available: json.available,
            creator: UserAccount.fromJson(json.creator),
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
        });
    }

    toJson(): any {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            image: this.image,
            available: this.available,
            creator: this.creator.toJson(),
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}
