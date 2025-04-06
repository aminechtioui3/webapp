import type { ProductCategoryProps } from "../sections/Product Category/product-category-table-row";

export class ProductCategory {
    id: number;

    title: string;

    description?: string;

    image?: string;

    available: boolean;

    createdAt: Date;

    updatedAt: Date;

    constructor({
                    id,
                    title,
                    description = "", // Default to empty string if not provided
                    image = "", // Default to empty string if not provided
                    available = true,
                    createdAt = new Date(),
                    updatedAt = new Date(),
                }: {
        id: number;
        title: string;
        description?: string;
        image?: string;
        available?: boolean;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJson(json: any): ProductCategory {
        return new ProductCategory({
            id: json.id ?? -1,
            title: json.title,
            description: json.description ?? "",
            image: json.image ?? "",
            available: json.available ?? true,
            createdAt: json.createdAt ? new Date(json.createdAt) : new Date(),
            updatedAt: json.updatedAt ? new Date(json.updatedAt) : new Date(),
        });
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
            title: this.title,
            available: this.available,
            image: this.image ? this.image : 'https://example.com/avatar.jpg', // Provide default image if missing
            description: this.description, // Update if description needs to be a boolean
        };
    }
}
