import axios from "axios";
import RatingProps from "../props/RatingProps";
import { API_RATINGS } from "../util/ApiUrls";

export async function createRating(rating: RatingProps): Promise<RatingProps> {
    try {
        const response = await axios.post(API_RATINGS, rating);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function getRatings(): Promise<RatingProps[]> {
    try {
        const response = await axios.get(API_RATINGS);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    } 
}

export async function getRatingById(id: number): Promise<RatingProps> {
    try {
        const responce = await axios.get(`${API_RATINGS}/${id}`);
        return responce.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function deleteRating(id:number) {
    return await axios.delete(`${API_RATINGS}/${id}`);
}