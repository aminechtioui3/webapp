import { Properties } from 'src/properties';
// eslint-disable-next-line import/no-named-as-default
import ResponseModel from "../../models/ResponseModel";

import api from "../../api/axiosConfig";
// eslint-disable-next-line import/no-cycle
import {ExpenseModel} from "../../models/ExpenseModel";



const properties = Properties.getInstance();
const client = api;

export async function getExpenses(): Promise<ResponseModel<ExpenseModel[]>> {
    try {
        const response = await client.post(properties.getAllExpenses);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const memberships = data.map(ExpenseModel.fromJson);

            const result = new ResponseModel<ExpenseModel[]>(true, memberships, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<ExpenseModel[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching Expenses:", error);
        return new ResponseModel<ExpenseModel[]>(false, [], "An error occurred", undefined);
    }
}







export async function createExpense(data: any): Promise<ResponseModel<String>> {
    console.log(data);
    const model = ExpenseModel.fromJson(data);

    console.log(model);
    console.log(model.toJson());
    try {
        const response = await client.post(properties.createExpense, model);
        console.log(response);
        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating Expense:', error);
        return new ResponseModel<String>(false, "", "Error Creating Expense", error.message);

    }
}


export async function updateExpense(data: any): Promise<ResponseModel<String>> {
    const model = ExpenseModel.fromJson(data);

    console.log("Updating Active Membership:", model);
    try {
        const response = await client.post(properties.updateExpense, model);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating Expense:', error);
        return new ResponseModel<String>(false, "", "Error Creating Expense", error.message);

    }
}



export async function deleteExpense(id: string): Promise<ResponseModel<String>> {



    try {
        const response = await client.post(`${properties.deleteExpense}/${id}`);

        console.log(response);
        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting Expense:', error);
        return new ResponseModel<String>(false, "", "Error Creating Expense", error.message);

    }
}

