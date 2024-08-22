import axios from "axios";
import ModeratorProps from "../props/ModeratorProps";
import { API_MODERATORS } from "../util/ApiUrls";

export async function createModerator(moderator: ModeratorProps): Promise<ModeratorProps> {
    try {
        const response = await axios.post(API_MODERATORS, moderator);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function getModerators(): Promise<ModeratorProps[]> {
    try {
        const response = await axios.get(API_MODERATORS);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    } 
}

export async function getModeratorById(id: number): Promise<ModeratorProps> {
    try {
        const responce = await axios.get(`${API_MODERATORS}/${id}`);
        return responce.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function deleteModerator(id:number) {
    return await axios.delete(`${API_MODERATORS}/${id}`);
}