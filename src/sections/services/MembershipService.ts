import axios, { Axios } from 'axios';
import { MembershipModel } from 'src/models/MembershipModel';
import { UserAccount } from 'src/models/UserAccount';
import { Properties } from 'src/properties';

const properties = Properties.getInstance();
const client = axios.create({baseURL : properties.baseURL});

export async function getMemberships() : Promise<MembershipModel[]>
{
    let res : MembershipModel[] = [];
    await client.post(properties.GetAllMemberships)
      .then(async response => {
        const data = await response.data;
        res =  data.map(MembershipModel);
    });
    return res;
}






export async function createMembership(data: any): Promise<boolean> {
  const model = MembershipModel.fromJson(data);

  try {const response = await client.post(properties.CreateMembership, model);




    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error("Error activating membership:", error);
    return false;
  }
}

