import Cookies from 'js-cookie';

import { Properties } from 'src/properties';
import { UserAccount } from 'src/models/UserAccount';

import api from "../../api/axiosConfig";


const properties = Properties.getInstance();
const client = api;

export async function getAccountDetails() : Promise<UserAccount[]>
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



export async function login(email :string,password :string): Promise<boolean> {
  
  
  try {const response = await client.post(properties.loginURL, {"email":email,"password":password}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_ACCESS_TOKEN`
    }
  });
  
    
    if( response.status === 200 || response.status === 201){
        // save token
        const token=response.data;
        Cookies.set("token", token, { expires: 7, secure: true }); // Expires in 7 days
        window.location.href = "/";
        return true;

    }
        return false;
    
  } catch (error) {
    console.error("Error activating membership:", error);
    return false;
  }
}



export async function logout(): Promise<boolean> {
    Cookies.remove("token");
    window.location.href = "/sign-in";
    return true;
}

