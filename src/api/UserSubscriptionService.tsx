import axios from "axios";
import UserSubscriptionProps from "../props/UserSubscriptionProps";
import { API_USER_SUBSCRIPTIONS } from "../util/ApiUrls";

export async function createUserSubscription(userSubscription: UserSubscriptionProps): Promise<UserSubscriptionProps> {
    try {
        const response = await axios.post(API_USER_SUBSCRIPTIONS, userSubscription);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function getUserSubscriptions(): Promise<UserSubscriptionProps[]> {
    try {
        const response = await axios.get(API_USER_SUBSCRIPTIONS);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    } 
}

export async function getUserSubscriptionById(id: number): Promise<UserSubscriptionProps> {
    try {
        const responce = await axios.get(`${API_USER_SUBSCRIPTIONS}/${id}`);
        return responce.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function deleteUserSubscription(id:number) {
    return await axios.delete(`${API_USER_SUBSCRIPTIONS}/${id}`);
}