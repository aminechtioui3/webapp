import axios, { Axios } from 'axios';
import Cookies from 'js-cookie';
import { MembershipModel } from 'src/models/MembershipModel';
import { UserAccount } from 'src/models/UserAccount';
import { Properties } from 'src/properties';

const properties = Properties.getInstance();
const client = axios.create({baseURL : properties.baseURL});

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
        //save token
        let token=response.data;
        Cookies.set("token", token, { expires: 7, secure: true }); // Expires in 7 days
        window.location.href = "/";
        return true;

    }else{
        return false;
    }
  } catch (error) {
    console.error("Error activating membership:", error);
    return false;
  }
}

