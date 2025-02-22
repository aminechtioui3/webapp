import axios, { Axios } from 'axios';
import { MembershipModel } from 'src/models/MembershipModel';
import { UserAccount } from 'src/models/UserAccount';
import { Properties } from 'src/properties';
import ResponseModel from "../../models/ResponseModel";
import {ActiveMembership} from "../../models/ActiveMembership";

const properties = Properties.getInstance();
const client = axios.create({baseURL : properties.baseURL});

export async function getMemberships() : Promise<ResponseModel<MembershipModel[]>>
{
    let res: MembershipModel[] = [];
    await client.get(properties.GetAllMemberships).then(async (response) => {
        if (response.status === 200 || response.status === 200) {
            const data = await response.data;
            res = data.map(MembershipModel.fromJson(data));
            return new ResponseModel<MembershipModel[]>(true, res, undefined, 'Operation completed');
        }
        return new ResponseModel<MembershipModel[]>(false, res, response.statusText, response.data);

    });
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

