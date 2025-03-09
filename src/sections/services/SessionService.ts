
import { Properties } from 'src/properties';
// eslint-disable-next-line import/no-named-as-default
import ResponseModel from "../../models/ResponseModel";

import api from "../../api/axiosConfig";
import {SessionModel} from "../../models/SessionModel";

const properties = Properties.getInstance();
const client = api;

export async function getAllSessions(): Promise<ResponseModel<SessionModel[]>> {
    try {
        const response = await client.post(properties.GetAllSessions);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const memberships = data.map(SessionModel.fromJson);

            const result = new ResponseModel<SessionModel[]>(true, memberships, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<SessionModel[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching :", error);
        return new ResponseModel<SessionModel[]>(false, [], "An error occurred", undefined);
    }
}







export async function createSession(data: any): Promise<ResponseModel<String>> {
    const model = SessionModel.fromJson(data);

    try {
        const response = await client.post(properties.CreateSession, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating :', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}


export async function updateSession(data: any): Promise<ResponseModel<String>> {
    const model = SessionModel.fromJson(data);

    try {
        const response = await client.post(properties.UpdateSession, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating :', error);
        return new ResponseModel<String>(false, "", "Error Creating ", error.message);

    }
}



export async function deleteSession(id: string): Promise<ResponseModel<String>> {


    try {
        const response = await client.post(`${properties.DeleteSession}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting :', error);
        return new ResponseModel<String>(false, "", "Error Creating ", error.message);

    }
}

