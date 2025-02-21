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
        image:string,
        description: string,
        price: number,
        available: boolean,
        createdAt: Date,
        updatedAt: Date
       
    ) {
        this.id = id;
        this.title = title;
        this.subTitle = subTitle;
        this.image=image;
        this.description = description;
        this.price = price;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
