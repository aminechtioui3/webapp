export class MembershipModel {
    id: number;
    title: string;
    subTitle: string;
    description: string;
    image?: string;
    price: number;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        title: string,
        subTitle: string,
        description: string,
        image: string | undefined,
        price: number,
        available: boolean,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.title = title;
        this.subTitle = subTitle;
        this.description = description;
        this.image = image;
        this.price = price;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Convert JSON object to MembershipModel instance
    static fromJson(json: any): MembershipModel {
        return new MembershipModel(
            json.id,
            json.title,
            json.subTitle,
            json.description,
            json.image,
            json.price,
            json.available,
            new Date(json.createdAt), // Ensure it's a Date object
            new Date(json.updatedAt)  // Ensure it's a Date object
        );
    }

    // Convert MembershipModel instance to JSON object
    toJson(): any {
        return {
            id: this.id,
            title: this.title,
            subTitle: this.subTitle,
            description: this.description,
            image: this.image,
            price: this.price,
            available: this.available,
            createdAt: this.createdAt.toISOString(), // Convert to string for JSON compatibility
            updatedAt: this.updatedAt.toISOString()
        };
    }
}
