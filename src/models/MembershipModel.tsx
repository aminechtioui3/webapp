export class MembershipModel {
    id: number;
    title: string;
    subTitle: string;
    description: string;
    image?: string;
    price: string;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        title: string,
        subTitle: string,
        description: string,
        price: string,
        available: boolean,
        options?: Partial<MembershipModel>
    ) {
        this.id = id;
        this.title = title;
        this.subTitle = subTitle;
        this.description = description;
        this.price = price;
        this.available = available;
        this.createdAt = new Date();
        this.updatedAt = new Date();

        // Merge optional properties if provided
        Object.assign(this, options);
    }
}
