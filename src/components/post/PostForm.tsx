import { useState } from "react";
import UserProps from "../../props/UserProps";
import { getUsers } from "../../api/UserService";
import PostProps from "../../props/PostProps";
import CommunityProps from "../../props/CommunityProps";
import { createPost } from "../../api/PostService";

const users: UserProps[] = await getUsers();

export function PostForm() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    function create() {
        const user:UserProps = JSON.parse(localStorage.getItem("user")!);
        const userPost = users.find(u => u.name === user.name);
        let community: CommunityProps;
        let parentPost: PostProps;
        const postdate = new Date(Date.now()).toISOString();
        
        let post: PostProps = {
            id: 0,
            user: userPost!,
            community: community!,
            parentPost: parentPost!,
            title: title,
            text: text,
            postDate: postdate,
            rating: 0,
            file: ""
        }

        createPost(post);
        window.location.href = "/posts/new";
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