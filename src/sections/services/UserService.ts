import axios, { Axios } from 'axios';
import { UserAccount } from 'src/models/UserAccount';
import { Properties } from 'src/properties';

const properties = Properties.getInstance();
const client = axios.create({baseURL : properties.baseURL});

export async function getUsers() : Promise<UserAccount[]>
{
    let res : UserAccount[] = [];
    await client.get(properties.GetUser)
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

