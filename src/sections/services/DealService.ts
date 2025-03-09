
import { UserAccount } from 'src/models/UserAccount';
import { Properties } from 'src/properties';
// eslint-disable-next-line import/no-named-as-default
import ResponseModel from "../../models/ResponseModel";

import api from "../../api/axiosConfig";
import {DealModel} from "../../models/DealModel";

const properties = Properties.getInstance();
const client = api;

export async function getDeals(): Promise<ResponseModel<DealModel[]>> {
    try {
        const response = await client.post(properties.GetAllDeals);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const memberships = data.map(DealModel.fromJson);

            const result = new ResponseModel<DealModel[]>(true, memberships, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<DealModel[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching memberships:", error);
        return new ResponseModel<DealModel[]>(false, [], "An error occurred", undefined);
    }
}







export async function createDeal(data: any): Promise<ResponseModel<String>> {
    const model = DealModel.fromJson(data);

    try {
        const response = await client.post(properties.CreateDeal, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}


export async function updateDeal(data: any): Promise<ResponseModel<String>> {
    const model = DealModel.fromJson(data);

    try {
        const response = await client.post(properties.UpdateDeal, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}



export async function deleteDeal(id: string): Promise<ResponseModel<String>> {


    try {
        const response = await client.post(`${properties.DeleteDeal}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}

