import Cookies from 'js-cookie';

import { Properties } from 'src/properties';
import { UserAccount } from 'src/models/UserAccount';

import api from "../../api/axiosConfig";
// eslint-disable-next-line import/no-named-as-default
import ResponseModel from "../../models/ResponseModel";


const properties = Properties.getInstance();
const client = api;

export async function getAccountDetails() : Promise<ResponseModel<UserAccount>>
{

    await client.post(properties.GetAccountById).then(async (response) => {
        if (response.status === 200 || response.status === 200) {
            const data = await response.data;
            const res = UserAccount.fromJson(data);
            return new ResponseModel<UserAccount>(true, res, undefined, 'Operation completed');
        }
        return new ResponseModel<UserAccount>(false, undefined, response.data, response.statusText);

    });
}




export async function checkIfTokenExist(): Promise<boolean>{
    const token = Cookies.get("token"); // Read token from cookies
    // return !!token;
    return true;
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

