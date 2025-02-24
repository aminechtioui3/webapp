import Cookies from 'js-cookie';

import { Properties } from 'src/properties';
import { UserAccount } from 'src/models/UserAccount';

// eslint-disable-next-line import/no-named-as-default
import ResponseModel from "../../models/ResponseModel";

import api from "../../api/axiosConfig";
import {MembershipModel} from "../../models/MembershipModel";


const properties = Properties.getInstance();
const client = api;

export async function getAccountDetails() : Promise<ResponseModel<UserAccount | undefined>>
{


    try {
        const response = await client.post(properties.GetAccountById);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const res = UserAccount.fromJson(data);

            const result = new ResponseModel<UserAccount>(true, res, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<UserAccount | undefined>(false,undefined , response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching Account Details:", error);
        return new ResponseModel<UserAccount | undefined>(false,undefined , "An error occurred", undefined);
    }
}


export async function getAllAccounts() : Promise<ResponseModel<UserAccount[]>>
{


    try {
        const response = await client.post(properties.GetAllAccounts);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const res = data.map(UserAccount.fromJson);

            const result = new ResponseModel<UserAccount[]>(true, res, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<UserAccount[]>(false,[] , response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching Accounts:", error);
        return new ResponseModel<UserAccount[]>(false,[] , "An error occurred", undefined);
    }
}





export async function checkIfTokenExist(): Promise<boolean>{
    const token = Cookies.get("token"); // Read token from cookies
     return !!token;
    // return true;
}




export async function login(email :string,password :string): Promise<ResponseModel<String>> {
  try {const response = await client.post(properties.loginURL, {"email":email,"password":password});

    if( response.status === 200 || response.status === 201){
        // save token
        const token=response.data;
        Cookies.set("token", token, { expires: 7, secure: true }); // Expires in 7 days
        window.location.href = "/";
        return new ResponseModel<String>(true, token, "Welcome Home!", response.statusText);

    }
      return new ResponseModel<String>(false, "", response.data, response.statusText);


  } catch (error) {
      return new ResponseModel<String>(false, "", "error ! please try again", error.message);
  }
}



export async function logout(): Promise<boolean> {
    Cookies.remove("token");
    window.location.href = "/sign-in";
    return true;
}

