// eslint-disable-next-line import/no-cycle
import {ProductCategory} from "./ProductCategoryModel";

import type {ShopProps} from "../sections/Shop/shop-table-row";

export class ProductModel {
    id: number;

    title: string;

    brand: string;

    model: string;

    description: string;

    image?: string;

    category: ProductCategory;

    price: number;

    salePercent?: number;

    availableNumber?: number;

    available: boolean;

    createdAt: Date;

    updatedAt: Date;

    constructor(
        id: number,
        title: string,
        brand: string,
        model: string,
        description: string,
        category: ProductCategory,
        price: number,
        available: boolean,
        image?: string,
        salePercent?: number,
        availableNumber?: number,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.title = title;
        this.brand = brand;
        this.model = model;
        this.description = description;
        this.image = image;
        this.category = category;
        this.price = price;
        this.salePercent = salePercent;
        this.availableNumber = availableNumber;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJson(json: any): ProductModel {
        return new ProductModel(
            json.id,
            json.title,
            json.brand,
            json.model,
            json.description,
            ProductCategory.fromJson(json.category),
            json.price,
            json.available,
            json.image ?? undefined,
            json.salePercent ?? undefined,
            json.availableNumber ?? undefined,
            new Date(json.createdAt),
            new Date(json.updatedAt)
        );
    }

    toJson(): any {
        return {
            id: this.id,
            title: this.title,
            brand: this.brand,
            model: this.model,
            description: this.description,
            image: this.image,
            category: this.category.toJson(),
            price: this.price,
            salePercent: this.salePercent,
            availableNumber: this.availableNumber,
            available: this.available,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }


    toShopProps(): ShopProps {
        return {


            id: this.id,
            title: this.title,
            brand: this.brand,
            model: this.model,
            description: this.description,
            category: this.category,
            price: this.price,
            salePercent: this.salePercent,
            availableNumber: this.availableNumber,
            available: this.available,

            image:( this.image)?this.image:'https://example.com/avatar.jpg',

        };
    }
}
