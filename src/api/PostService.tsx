import axios from "axios";
import PostProps from "../props/PostProps";
import { API_POSTS } from "../util/ApiUrls";

export async function createPost(post: PostProps): Promise<PostProps> {
    try {
        const response = await axios.post(API_POSTS, post);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function getPosts(): Promise<PostProps[]> {
    try {
        const response = await axios.get(API_POSTS);
        return response.data;
    } catch(error) {
        console.log(error);
        throw(error);
    } 
}

export async function getPostById(id: number): Promise<PostProps> {
    try {
        const responce = await axios.get(`${API_POSTS}/${id}`);
        return responce.data;
    } catch(error) {
        console.log(error);
        throw(error);
    }
}

export async function updatePost(id: number, post: PostProps) {
    return await axios.put(`${API_POSTS}/${id}`, post);
}

export async function deletePost(id:number) {
    return await axios.delete(`${API_POSTS}/${id}`);
}