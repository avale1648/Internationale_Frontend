import axios from "axios";
import UserProps from "../props/UserProps";
import { API_USERS } from "../util/ApiUrls";

export async function createUser(user: UserProps): Promise<UserProps> {
    try {
        const response = await axios.post(API_USERS, user);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function getUsers(): Promise<UserProps[]> {
    try {
        const response = await axios.get(API_USERS);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    } 
}

export async function getUserById(id: number): Promise<UserProps> {
    try {
        const responce = await axios.get(`${API_USERS}/${id}`);
        return responce.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function updateUser(id: number, user: UserProps) {
    return await axios.put(`${API_USERS}/${id}`, user);
}

export async function deleteUser(id:number) {
    return await axios.delete(`${API_USERS}/${id}`);
}