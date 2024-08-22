import axios from "axios";
import { API_COMMUNITIES } from "../util/ApiUrls";
import CommunityProps from "../props/CommunityProps";

export async function createCommunity(community: CommunityProps): Promise<CommunityProps> {
    try {
        const response = await axios.post(API_COMMUNITIES, community);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function getCommunities(): Promise<CommunityProps[]> {
    try {
        const response = await axios.get(API_COMMUNITIES);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    } 
}

export async function getCommunityById(id: number): Promise<CommunityProps> {
    try {
        const responce = await axios.get(`${API_COMMUNITIES}/${id}`);
        return responce.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function updateCommunity(id: number, community: CommunityProps) {
    return await axios.put(`${API_COMMUNITIES}/${id}`, community);
}

export async function deleteCommunity(id:number) {
    return await axios.delete(`${API_COMMUNITIES}/${id}`);
}