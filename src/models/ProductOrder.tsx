import { UserAccount } from "./UserAccount";
// eslint-disable-next-line import/no-cycle
import { ProductModel } from "./ProductModel";

import type { ProductOrderStatus } from "./ProductOrderStatus";
import type { ProductOrderProps } from "../sections/Product Order/product-order-table-row";

export class ProductOrderModel {
    id: number;

    name: string;

    productModel: ProductModel;

    userModel: UserAccount;

    address: string;

    phone: string;

    note?: string;

    quantity: number;

    status: ProductOrderStatus;

    price: string;

    createdAt: Date;

    updatedAt: Date;

    constructor({
                    id,
                    name,
                    productModel,
                    userModel,
                    address,
                    phone,
                    quantity,
                    status,
                    price,
                    note = "", // Default to empty string if not provided
                    createdAt = new Date(),
                    updatedAt = new Date(),
                }: {
        id: number;
        name: string;
        productModel: ProductModel;
        userModel: UserAccount;
        address: string;
        phone: string;
        quantity: number;
        status: ProductOrderStatus;
        price: string;
        note?: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.id = id;
        this.name = name;
        this.productModel = productModel;
        this.userModel = userModel;
        this.address = address;
        this.phone = phone;
        this.quantity = quantity;
        this.status = status;
        this.price = price;
        this.note = note;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJson(json: any): ProductOrderModel {
        return new ProductOrderModel({
            id: json.id,
            name: json.name,
            productModel: ProductModel.fromJson(json.productModel),
            userModel: UserAccount.fromJson(json.userModel),
            address: json.address,
            phone: json.phone,
            quantity: json.quantity,
            status: json.status as ProductOrderStatus,
            price: json.price,
            note: json.note ?? "",
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
        });
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            productModel: this.productModel.toJson(),
            userModel: this.userModel.toJson(),
            address: this.address,
            phone: this.phone,
            quantity: this.quantity,
            status: this.status,
            price: this.price,
            note: this.note,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }

    toProductOrderProps(): ProductOrderProps {
        return {
            id: this.id,
            name: this.name,
            productModel: this.productModel.toJson(),
            userModel: this.userModel.toJson(),
            address: this.address,
            phone: this.phone,
            quantity: this.quantity,
            status: this.status,
            price: this.price,
            note: this.note,
            createdAt:this.createdAt,
        };
    }
}
