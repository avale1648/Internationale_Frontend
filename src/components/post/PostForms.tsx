import { useState } from "react";
import UserProps from "../../props/UserProps";
import { getUserById} from "../../api/UserService";
import PostProps from "../../props/PostProps";
import CommunityProps from "../../props/CommunityProps";
import { createPost, getPosts, updatePost} from "../../api/PostService";
import { getCommunities } from "../../api/CommunityService";
import { useParams } from "react-router-dom";

const userId: number = Number(localStorage.getItem("user_id"));
const user: UserProps| undefined = localStorage.getItem("user_id") === null? undefined: await getUserById(userId);
const communities: CommunityProps[] = await getCommunities();
const posts: PostProps[] = await getPosts();

export function PostSubmitForm({submitOn, submitOnId}:{submitOn: string, submitOnId: string}) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    console.log(submitOn, submitOnId);

    let community: CommunityProps | undefined;
    if(submitOn === "community") {
        community = communities.find(c => c.id.toString() === submitOnId);
    }
    console.log(community);
    const href = submitOn === ""? `/users/${user?.name}`: `/communities/${community?.name}`;

    function create() {
        const postdate = new Date(Date.now()).toISOString();
        
        let post: PostProps = {
            id: 0,
            user: user!,
            community: community,
            parentPost: undefined,
            title: title!,
            text: text!,
            postDate: postdate,
            rating: 0,
            file: ""
        }

        createPost(post);
        window.location.href = href;
    }

    return (
    <div className="signup-container">
        <h2>New post</h2>
        <label htmlFor="title-input">Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title-input" name="title-input" placeholder="Enter a title" />
        <label htmlFor="text-input">Text:</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} id="text-input" name="text-input" placeholder="Enter a text" />
        <button onClick={create}>Submit</button>
    </div>);
}

export function PostEditForm() {
    const {id} = useParams();
    const postToUpdate = posts.find(p => p.id.toString() === id);

    const [title, setTitle] = useState(postToUpdate?.title);
    const [text, setText] = useState(postToUpdate?.text);

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
        <h2>Edit post</h2>
        <label htmlFor="title-input">Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title-input" name="title-input" placeholder="Enter a title" />
        <label htmlFor="text-input">Text:</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} id="text-input" name="text-input" placeholder="Enter a text" />
        <button onClick={update}>Submit</button>
    </div>);
}