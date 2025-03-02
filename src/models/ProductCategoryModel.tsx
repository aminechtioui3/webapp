import {ProductCategoryProps} from "../sections/Product Category/product-category-table-row";


export class ProductCategory {
    id: number;
    title: string;
    description?: string;
    image?: string;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        title: string,
        description?: string,
        image?: string,
        available: boolean = true,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJson(json: any): ProductCategory {
        return new ProductCategory(
            json.id,
            json.title,
            json.description ?? undefined,
            json.image ?? undefined,
            json.available,
            new Date(json.createdAt),
            new Date(json.updatedAt)
        );
    }

    toJson(): any {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            image: this.image,
            available: this.available,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }

    toProductCategoryProps(): ProductCategoryProps {
        return {
            id: this.id,
            name: this.title,
            available: this.available,
            image:( this.image)?this.image:'https://example.com/avatar.jpg',
            description: this.description, // Consider making this a boolean instead of a string
        };
    }
}
