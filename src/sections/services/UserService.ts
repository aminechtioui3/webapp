import { Properties } from 'src/properties';
import ResponseModel from "../../models/ResponseModel";

import api from "../../api/axiosConfig";

import {ActiveMembership} from "../../models/ActiveMembership";
import {ActiveMembershipCreationDTO} from "../../models/ActivateMembershipCreationDTO";

const properties = Properties.getInstance();
const client = api;

export async function getMembers(): Promise<ResponseModel<ActiveMembership[]>> {
  try {
    const response = await client.post(properties.GetAllActiveMembership);

    if (response.status === 200) {
      const data = response.data;

      console.log(data);

      const memberships = data.map(ActiveMembership.fromJson);

      const result = new ResponseModel<ActiveMembership[]>(true, memberships, undefined, 'Operation completed');

      console.log(result);
      return result;
    }

    return new ResponseModel<ActiveMembership[]>(false, [], response.statusText, response.data);
  } catch (error) {
    console.error("Error fetching Members:", error);
    return new ResponseModel<ActiveMembership[]>(false, [], "An error occurred", undefined);
  }
}







export async function createActiveMembership(data: any): Promise<ResponseModel<String>> {
 console.log(data);
  const model = ActiveMembershipCreationDTO.fromJSON(data);

  console.log(model);
  console.log(model.toJSON());
  try {
    const response = await client.post(properties.ActivateMembership, model);
    console.log(response);
    if (response.status === 200 || response.status === 201) {
      return new ResponseModel<String>(true, "", undefined, 'Operation completed');
    }
    return new ResponseModel<String>(false, "", response.data, response.statusText);

  } catch (error) {
    console.error('Error Creating membership:', error);
    return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

  }
}


export async function updateActiveMembership(data: any): Promise<ResponseModel<String>> {
  const model = ActiveMembership.fromJson(data);

  console.log("Updating Active Membership:", model);
  try {
    const response = await client.post(properties.UpdateActiveMembership, model);

    if (response.status === 200 || response.status === 201) {
      return new ResponseModel<String>(true, "", undefined, 'Operation completed');
    }
    return new ResponseModel<String>(false, "", response.data, response.statusText);

  } catch (error) {
    console.error('Error Creating membership:', error);
    return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

  }
}



export async function deleteActiveMembership(id: string): Promise<ResponseModel<String>> {


  try {
    const response = await client.post(`${properties.DeleteActiveMembership}/${id}`);

    console.log(response);
    if (response.status === 200 || response.status === 201) {
      return new ResponseModel<String>(true, "", undefined, 'Operation completed');
    }
    return new ResponseModel<String>(false, "", response.data, response.statusText);

  } catch (error) {
    console.error('Error Deleting membership:', error);
    return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

  }
}

