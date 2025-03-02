
import { UserAccount } from 'src/models/UserAccount';
import { Properties } from 'src/properties';
// eslint-disable-next-line import/no-named-as-default
import ResponseModel from "../../models/ResponseModel";

import api from "../../api/axiosConfig";
import {HistoryModel} from "../../models/HistoryModel";


const properties = Properties.getInstance();
const client = api;

export async function getHistory(): Promise<ResponseModel<HistoryModel[]>> {
    try {
        const response = await client.post(properties.getAllHistory);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const memberships = data.map(HistoryModel.fromJson);

            const result = new ResponseModel<HistoryModel[]>(true, memberships, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<HistoryModel[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching memberships:", error);
        return new ResponseModel<HistoryModel[]>(false, [], "An error occurred", undefined);
    }
}










export async function deleteHistory(id: string): Promise<ResponseModel<String>> {


    try {
        const response = await client.post(`${properties.deleteHistory}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}

