import { useState } from "react";
import UserProps from "../../props/UserProps";
import { getUserById} from "../../api/UserService";
import PostProps from "../../props/PostProps";
import CommunityProps from "../../props/CommunityProps";
import { createPost, getPostById } from "../../api/PostService";
import { getCommunityById } from "../../api/CommunityService";

const userId: number = Number(localStorage.getItem("user_id"));
const user: UserProps| undefined = localStorage.getItem("user_id") !== null? await getUserById(userId): undefined;
const communityId: number = Number(localStorage.getItem("community_id"));
const community: CommunityProps = await getCommunityById(communityId);
const postId: number = Number(localStorage.getItem("post_id"));
const parentPost: PostProps = await getPostById(postId); 

export function PostForm() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    function create() {
        const postdate = new Date(Date.now()).toISOString();
        const postSubmitMode = localStorage.getItem("post_submit_mode");

        const href = postSubmitMode === "user"? `/users/${user?.name}`: 
            postSubmitMode === "community"? `/communities/${community?.name}`: `/posts/${parentPost.id}`;
        
        let post: PostProps = {
            id: 0,
            user: user!,
            community: postSubmitMode === "community"? community: undefined,
            parentPost: postSubmitMode === "post"? parentPost: undefined,
            title: title,
            text: text,
            postDate: postdate,
            rating: 0,
            file: ""
        }

        createPost(post);
        window.location.href = href;
    }

    return (
    <div className="signup-container">
        <h2>New Post</h2>
        <label htmlFor="title-input">Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title-input" name="title-input" placeholder="Enter a title" />
        <label htmlFor="text-input">Text:</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} id="text-input" name="text-input" placeholder="Enter a text" />
        <button onClick={create}>Submit</button>
    </div>);
}