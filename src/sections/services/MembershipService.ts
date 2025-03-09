
// eslint-disable-next-line import/no-cycle
import { MembershipModel } from 'src/models/MembershipModel';
import { UserAccount } from 'src/models/UserAccount';
import { Properties } from 'src/properties';
// eslint-disable-next-line import/no-named-as-default
import ResponseModel from "../../models/ResponseModel";
import {ActiveMembership} from "../../models/ActiveMembership";
import api from "../../api/axiosConfig";

const properties = Properties.getInstance();
const client = api;

export async function getMemberships(): Promise<ResponseModel<MembershipModel[]>> {
    try {
        const response = await client.post(properties.GetAllMemberships);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const memberships = data.map(MembershipModel.fromJson);

            const result = new ResponseModel<MembershipModel[]>(true, memberships, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<MembershipModel[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching memberships:", error);
        return new ResponseModel<MembershipModel[]>(false, [], "An error occurred", undefined);
    }
}







export async function createMembership(data: any): Promise<ResponseModel<String>> {
    const model = MembershipModel.fromJson(data);

    try {
        const response = await client.post(properties.CreateMembership, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}


export async function updateMembership(data: any): Promise<ResponseModel<String>> {
    const model = MembershipModel.fromJson(data);

    try {
        const response = await client.post(properties.UpdateMembership, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}



export async function deleteMembership(id: string): Promise<ResponseModel<String>> {
    

    try {
        const response = await client.post(`${properties.DeleteMembership}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}

