import axios from "axios";
import CommunitySubscriptionProps from "../props/CommunitySubscriptionProps";
import { API_COMMUNITY_SUBSCRIPTIONS } from "../util/ApiUrls";

export async function createCommunitySubscription(communitySubscription: CommunitySubscriptionProps): Promise<CommunitySubscriptionProps> {
    try {
        const response = await axios.post(API_COMMUNITY_SUBSCRIPTIONS, communitySubscription);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function getCommunitySubscriptions(): Promise<CommunitySubscriptionProps[]> {
    try {
        const response = await axios.get(API_COMMUNITY_SUBSCRIPTIONS);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    } 
}

export async function getCommunitySubscriptionById(id: number): Promise<CommunitySubscriptionProps> {
    try {
        const responce = await axios.get(`${API_COMMUNITY_SUBSCRIPTIONS}/${id}`);
        return responce.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function deleteCommunitySubscription(id:number) {
    return await axios.delete(`${API_COMMUNITY_SUBSCRIPTIONS}/${id}`);
}