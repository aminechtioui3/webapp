import { ProductModel } from "./ProductModel";
import { UserAccount } from "./UserAccount";
import { ProductOrderStatus } from "./ProductOrderStatus";
import {ProductOrderProps} from "../sections/Product Order/product-order-table-row";

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

    constructor(
        id: number,
        name: string,
        productModel: ProductModel,
        userModel: UserAccount,
        address: string,
        phone: string,
        quantity: number,
        status: ProductOrderStatus,
        price: string,
        note?: string,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
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
        return new ProductOrderModel(
            json.id,
            json.name,
            ProductModel.fromJson(json.productModel),
            UserAccount.fromJson(json.userModel),
            json.address,
            json.phone,
            json.quantity,
            json.status as ProductOrderStatus,
            json.price,
            json.note ?? undefined,
            new Date(json.createdAt),
            new Date(json.updatedAt)
        );
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
        };
    }
}
