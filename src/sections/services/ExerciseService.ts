
import { UserAccount } from 'src/models/UserAccount';
import { Properties } from 'src/properties';
import ResponseModel from "../../models/ResponseModel";

import api from "../../api/axiosConfig";
import {ExerciseModel} from "../../models/ExerciseModel";

const properties = Properties.getInstance();
const client = api;

export async function getExercise(): Promise<ResponseModel<ExerciseModel[]>> {
    try {
        const response = await client.post(properties.GetAllExercises);

        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const memberships = data.map(ExerciseModel.fromJson);

            const result = new ResponseModel<ExerciseModel[]>(true, memberships, undefined, 'Operation completed');

            console.log(result);
            return result;
        }

        return new ResponseModel<ExerciseModel[]>(false, [], response.statusText, response.data);
    } catch (error) {
        console.error("Error fetching memberships:", error);
        return new ResponseModel<ExerciseModel[]>(false, [], "An error occurred", undefined);
    }
}







export async function createExercise(data: any): Promise<ResponseModel<String>> {
    const model = ExerciseModel.fromJson(data);

    try {
        const response = await client.post(properties.CreateExercise, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}


export async function updateExercise(data: any): Promise<ResponseModel<String>> {
    const model = ExerciseModel.fromJson(data);

    try {
        const response = await client.post(properties.UpdateExercise, model);

        if (response.status === 200 || response.status === 200) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Creating membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}



export async function deleteExercise(id: string): Promise<ResponseModel<String>> {


    try {
        const response = await client.post(`${properties.DeleteExercise}/${id}`);

        if (response.status === 200 || response.status === 201) {
            return new ResponseModel<String>(true, "", undefined, 'Operation completed');
        }
        return new ResponseModel<String>(false, "", response.data, response.statusText);

    } catch (error) {
        console.error('Error Deleting membership:', error);
        return new ResponseModel<String>(false, "", "Error Creating Membership", error.message);

    }
}

