

import { UserAccount } from 'src/models/UserAccount';
import { Properties } from 'src/properties';
import ResponseModel from "../../models/ResponseModel";
import {ActiveMembership} from "../../models/ActiveMembership";
import api from "../../api/axiosConfig";
import {ProductModel} from "../../models/ProductModel";
import {ProductCategory} from "../../models/ProductCategoryModel";
import {ProductOrderModel} from "../../models/ProductOrder";

const properties = Properties.getInstance();
const client = api;

export async function getAllShopProducts(): Promise<ResponseModel<ProductModel[]>> {
    try {
        const response = await client.post(properties.GetAllProducts);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const memberships = data.map(ProductModel.fromJson);

            const result = new ResponseModel<ProductModel[]>(true, memberships, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<ProductModel[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching products:", error);
        return new ResponseModel<ProductModel[]>(false, [], "An error occurred", undefined);
    }
}







export async function createShopProduct(data: any): Promise<ResponseModel<String>> {
    const model = ProductModel.fromJson(data);

    try {
        const response = await client.post(properties.CreateProduct, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}


export async function updateProduct(data: any): Promise<ResponseModel<String>> {
    const model = ProductModel.fromJson(data);

    try {
        const response = await client.post(properties.UpdateProduct, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}



export async function deleteProduct(id: string): Promise<ResponseModel<String>> {


    try {
        const response = await client.post(`${properties.DeleteProduct}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}



export async function getAllProductCategories(): Promise<ResponseModel<ProductCategory[]>> {
    try {
        const response = await client.post(properties.GetAllProductCategory);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const memberships = data.map(ProductModel.fromJson);

            const result = new ResponseModel<ProductCategory[]>(true, memberships, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<ProductCategory[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching products:", error);
        return new ResponseModel<ProductCategory[]>(false, [], "An error occurred", undefined);
    }
}







export async function createProductCategory(data: any): Promise<ResponseModel<String>> {
    const model = ProductModel.fromJson(data);

    try {
        const response = await client.post(properties.CreateProductCategory, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}


export async function updateProductCategory(data: any): Promise<ResponseModel<String>> {
    const model = ProductModel.fromJson(data);

    try {
        const response = await client.post(properties.UpdateProductCategory, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}



export async function deleteProductCategory(id: string): Promise<ResponseModel<String>> {


    try {

        const response = await client.post(`${properties.DeleteProductCategory}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}


export async function getAllProductOrders(): Promise<ResponseModel<ProductOrderModel[]>> {
    try {
        const response = await client.post(properties.GetAllProductOrders);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const memberships = data.map(ProductModel.fromJson);

            const result = new ResponseModel<ProductOrderModel[]>(true, memberships, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<ProductOrderModel[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching products:", error);
        return new ResponseModel<ProductOrderModel[]>(false, [], "An error occurred", undefined);
    }
}




export async function updateProductOrder(data: any): Promise<ResponseModel<String>> {
    const model = ProductModel.fromJson(data);

    try {
        const response = await client.post(properties.UpdateProductOrder, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}



export async function deleteProductOrder(id: string): Promise<ResponseModel<String>> {


    try {

        const response = await client.post(`${properties.DeleteProductOrder}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}

