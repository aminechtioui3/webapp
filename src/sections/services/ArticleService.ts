
import { Properties } from 'src/properties';
import ResponseModel from "../../models/ResponseModel";

import api from "../../api/axiosConfig";
import {ArticleModel} from "../../models/Article";

const properties = Properties.getInstance();
const client = api;

export async function getArticles(): Promise<ResponseModel<ArticleModel[]>> {
    try {
        const response = await client.post(properties.GetAllNews);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const memberships = data.map(ArticleModel.fromJson);

            const result = new ResponseModel<ArticleModel[]>(true, memberships, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<ArticleModel[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching memberships:", error);
        return new ResponseModel<ArticleModel[]>(false, [], "An error occurred", undefined);
    }
}







export async function createArticle(data: any): Promise<ResponseModel<String>> {
    const model = ArticleModel.fromJson(data);

    try {
        const response = await client.post(properties.CreateNews, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}


export async function updateArticle(data: any): Promise<ResponseModel<String>> {
    const model = ArticleModel.fromJson(data);

    try {
        const response = await client.post(properties.UpdateNews, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}



export async function deleteArticle(id: string): Promise<ResponseModel<String>> {


    try {
        const response = await client.post(`${properties.DeleteNews}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}

