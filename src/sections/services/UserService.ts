import axios, { Axios } from 'axios';
import { MembershipModel } from 'src/models/MembershipModel';
import { UserAccount } from 'src/models/UserAccount';
import { Properties } from 'src/properties';

const properties = Properties.getInstance();
const client = axios.create({baseURL : properties.baseURL});

export async function getUsers() : Promise<UserAccount[]>
{
    let res : UserAccount[] = [];
    await client.get(properties.GetUsers)
      .then(async response => {
        const data = await response.data;
        res =  data.map(fromJson);
    });
    return res;
}

function fromJson(json: any) : UserAccount{
    return new UserAccount(json.id, json.email, json.password, json.role,
            json.firstName, json.lastName, json.phone, json.options);
}
function fromJsonMs(json: any): MembershipModel {
  return new MembershipModel(
    json.id,
    json.title,
    json.description,
    json.subTitle,
    json.image,
    json.price,
    json.available,
    json.createdAt,
    json.updatedAt
  );
}



export async function startMembership(data: any): Promise<boolean> {
  const model = fromJsonMs(data);
  
  try {const response = await client.post("/test/2", model, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_ACCESS_TOKEN`
    }
  });
  
    

    
    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error("Error activating membership:", error);
    return false;
  }
}

