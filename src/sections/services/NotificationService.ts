import { Properties } from 'src/properties';
// eslint-disable-next-line import/no-named-as-default
import ResponseModel from "../../models/ResponseModel";

import api from "../../api/axiosConfig";
import {NotificationModel} from "../../models/NotificationModel";

const properties = Properties.getInstance();
const client = api;

export async function getAllNotifications(): Promise<ResponseModel<NotificationModel[]>> {
    try {
        const response = await client.post(properties.GetAllNotifications);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const memberships = data.map(NotificationModel.fromJson);

            const result = new ResponseModel<NotificationModel[]>(true, memberships, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<NotificationModel[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching Notifications:", error);
        return new ResponseModel<NotificationModel[]>(false, [], "An error occurred", undefined);
    }
}







export async function createNotification(data: any): Promise<ResponseModel<String>> {
    const model = NotificationModel.fromJson(data);

    try {
        const response = await client.post(properties.CreateNotification, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}




export async function deleteNotification(id: string): Promise<ResponseModel<String>> {


    try {
        const response = await client.post(`${properties.DeleteNotification}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}

