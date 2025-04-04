import Cookies from 'js-cookie';

import { Properties } from 'src/properties';
import { UserAccount } from 'src/models/UserAccount';

// eslint-disable-next-line import/no-named-as-default
import ResponseModel from "../../models/ResponseModel";

// eslint-disable-next-line import/no-cycle
import api from "../../api/axiosConfig";
import {MembershipModel} from "../../models/MembershipModel";
import {GymModel} from "../../models/GymModel";
import {ProductCategory} from "../../models/ProductCategoryModel";
import {GymStatistics} from "../../models/GymStatistics";
import {MoneyTransactionHistory} from "../../models/MoneyTransactionHistory";
import {HistoryModel} from "../../models/HistoryModel";
import {SessionModel} from "../../models/SessionModel";


const properties = Properties.getInstance();
const client = api;






export async function getAllGymFacilities(): Promise<ResponseModel<GymModel[]>> {
    try {
        const response = await client.post(properties.getAllGymFacilities);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const gymFacilities = data.map(GymModel.fromJson);

            const result = new ResponseModel<GymModel[]>(true, gymFacilities, undefined, 'Operation completed');

            Cookies.set("gymFacilities", JSON.stringify(gymFacilities), { expires: 7, secure: true }); // Expires in 7 days



            console.log(result);
            return result;
        }

        return new ResponseModel<GymModel[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching :", error);
        return new ResponseModel<GymModel[]>(false, [], "An error occurred", undefined);
    }
}



export function getGymModelsFromCookies(): GymModel[] {
    const gymModelsJson = Cookies.get('gymFacilities');

    if (gymModelsJson) {
        const gymModelsArray = JSON.parse(gymModelsJson).map((gym: any) => GymModel.fromJson(gym));

        // Ensure there's a default gym if the list is empty
        if (gymModelsArray.length === 0) {
            return [new GymModel({ id: -1, name: "Select a gym" })];
        }

        return gymModelsArray;
    }

    // If no data is found in cookies, return the default gym
    return [new GymModel({ id: -1, name: "Select a gym" })];
}

export function getSelectedGymFromCookies(): GymModel {
    const selectedGymJson = Cookies.get('selectedGym');
    if (selectedGymJson) {
        return GymModel.fromJson(JSON.parse(selectedGymJson));
    }

    return new GymModel({ id: -1, name: "Select a gym" });
}



export async function getGymStatistics(): Promise<ResponseModel<GymStatistics | null>> {
    try {
        const selectedGym=getSelectedGymFromCookies()
        const response = await client.post(`${properties.GetGymStatics}/${selectedGym.id}`);

        console.log(response);
        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const model = GymStatistics.fromJson(data);

            const result = new ResponseModel<GymStatistics>(true, model, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<GymStatistics | null>(false, null, response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching products:", error);
        return new ResponseModel<GymStatistics | null>(false, null, "An error occurred", undefined);
    }
}

export async function getGymMoneyTransactionHistory(): Promise<ResponseModel<MoneyTransactionHistory[]>> {
    try {
        const selectedGym=getSelectedGymFromCookies()
        const response = await client.post(`${properties.GetGymMoneyTransactionHistory}/${selectedGym.id}`);

        console.log(response);
        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const model = data.map(MoneyTransactionHistory.fromJson);

            const result = new ResponseModel<MoneyTransactionHistory[]>(true, model, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<MoneyTransactionHistory[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching products:", error);
        return new ResponseModel<MoneyTransactionHistory[]>(false, [], "An error occurred", undefined);
    }
}




export async function createGymFacility (data: any): Promise<ResponseModel<String>> {
    const model = GymModel.fromJson(data);

    try {
        const response = await client.post(properties.createGymFacility, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating :', error);
        return new ResponseModel<String>(false, "", "Error Creating Gym Model", error.message);

    }
}


export async function updateGymFacility(data: any): Promise<ResponseModel<String>> {
    const model = GymModel.fromJson(data);

    try {
        const response = await client.post(properties.updateGymFacility, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating :', error);
        return new ResponseModel<String>(false, "", "Error Creating ", error.message);

    }
}



export async function deleteGymFacility(id: string): Promise<ResponseModel<String>> {


    try {
        const response = await client.post(`${properties.deleteGymFacility}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting :', error);
        return new ResponseModel<String>(false, "", "Error Creating ", error.message);

    }
}


