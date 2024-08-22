import axios from "axios";
import MessageProps from "../props/MessageProps";
import { API_MESSAGES } from "../util/ApiUrls";

export async function createMessage(message: MessageProps): Promise<MessageProps> {
    try {
        const response = await axios.post(API_MESSAGES, message);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function getMessages(): Promise<MessageProps[]> {
    try {
        const response = await axios.get(API_MESSAGES);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    } 
}

export async function getMessageById(id: number): Promise<MessageProps> {
    try {
        const responce = await axios.get(`${API_MESSAGES}/${id}`);
        return responce.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function updateMessage(id: number, message: MessageProps) {
    return await axios.put(`${API_MESSAGES}/${id}`, message);
}

export async function deleteMessage(id:number) {
    return await axios.delete(`${API_MESSAGES}/${id}`);
}