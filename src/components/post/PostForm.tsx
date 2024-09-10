import { useState } from "react";
import UserProps from "../../props/UserProps";
import { getUserById} from "../../api/UserService";
import PostProps from "../../props/PostProps";
import CommunityProps from "../../props/CommunityProps";
import { createPost, getPostById, getPosts, updatePost } from "../../api/PostService";
import { getCommunityById } from "../../api/CommunityService";
import { useParams } from "react-router-dom";

const userId: number = Number(localStorage.getItem("user_id"));
const user: UserProps| undefined = await getUserById(userId);
const communityId: number = Number(localStorage.getItem("community_id"));
const community: CommunityProps| undefined = await getCommunityById(communityId);
const parentPostId: number = Number(localStorage.getItem("post_id"));
const parentPost: PostProps| undefined = await getPostById(parentPostId);
const posts: PostProps[] = await getPosts();

export function PostForm({mode}:{mode:string}) {
    const {id} = useParams();
    const postToUpdate = posts.find(p => p.id.toString() === id);

    const [title, setTitle] = useState(mode === "add"? "": postToUpdate?.title);
    const [text, setText] = useState(mode === "add"? "": postToUpdate?.text);


    const postSubmitMode = localStorage.getItem("post_submit_mode");
    const href = postSubmitMode === "user"? `/users/${user?.name}`: 
    postSubmitMode === "community"? `/communities/${community?.name}`: `/posts/${parentPost?.id}`;

    function create() {
        const postdate = new Date(Date.now()).toISOString();
        
        let post: PostProps = {
            id: 0,
            user: user!,
            community: postSubmitMode === "community"? community: undefined,
            parentPost: postSubmitMode === "post"? parentPost: undefined,
            title: title!,
            text: text!,
            postDate: postdate,
            rating: 0,
            file: ""
        }

        createPost(post);
        window.location.href = href;
    }

    async function update() {
        let post: PostProps = {
            id: postToUpdate!.id,
            user: postToUpdate!.user,
            community: postToUpdate!.community,
            parentPost: postToUpdate!.parentPost,
            title: title!,
            text: text!,
            postDate: postToUpdate!.postDate,
            rating: postToUpdate!.rating,
            file: postToUpdate!.file
        }

        await updatePost(post.id, post);
        window.location.href = `/posts/${post.id}`;
    }

    return (
    <div className="signup-container">
        <h2>{mode === "add"? "New post": "Edit post"}</h2>
        <label htmlFor="title-input">Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title-input" name="title-input" placeholder="Enter a title" />
        <label htmlFor="text-input">Text:</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} id="text-input" name="text-input" placeholder="Enter a text" />
        <button onClick={mode === "add"?create: update}>Submit</button>
    </div>);
}