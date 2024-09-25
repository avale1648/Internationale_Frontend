import { useState } from "react";
import UserProps from "../../props/UserProps";
import { getUserById, getUsers } from "../../api/UserService";
import CommunityProps from "../../props/CommunityProps";
import { createCommunity, getCommunities, updateCommunity } from "../../api/CommunityService";
import { useParams } from "react-router-dom";
import { createModerator } from "../../api/ModeratorService";
import ModeratorProps from "../../props/ModeratorProps";

const users: UserProps[] = await getUsers();
const communities: CommunityProps[] = await getCommunities();
const userId: number = Number(localStorage.getItem("user_id"));
const user: UserProps | undefined = localStorage.getItem("user_id") === null ? undefined : await getUserById(userId);

export function CommunitySubmitForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [mature, setMature] = useState("false");

    async function create() {
        const cakedate = new Date(Date.now()).toISOString();
        
        let community: CommunityProps = {
            id: 0,
            founder: user!,
            name: name,
            mature: mature === "false"? false: true,
            rating: 0,
            cakedate: cakedate,
            description: description,
            pfp: "http://localhost:1648/files/default-community-pfp.png",
            banner: "http://localhost:1648/files/default_banner.png"
        }

        await createCommunity(community);
        window.location.href = `/communities/${community.name}`;
    }

    return (
    <div className="signup-container">
        <h2>New Community</h2>
        <label htmlFor="name-input">Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name-input" name="name-input" placeholder="Enter a name" />
        <label htmlFor="description-input">Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} id="description-input" name="description-input" placeholder="Enter a description" />
        <label htmlFor="mature-input"></label>
        <input type="checkbox" value={mature} onChange={(e) => setMature(mature === "false"? "true": "false")} id="mature-input" name="mature-input"/>
        <button onClick={create}>Submit</button>
    </div>);
}

export function CommunityEditForm() {
    const {name} = useParams();
    const communityToUpdate = communities.find(c => c.name === name);

    const [communityName, setCommunityName] = useState(communityToUpdate!.name);
    const [description, setDescription] = useState(communityToUpdate!.description);

    async function update() {
        let community: CommunityProps = {
            id: communityToUpdate!.id,
            founder: communityToUpdate!.founder,
            name: communityName,
            mature: communityToUpdate!.mature,
            rating: communityToUpdate!.rating,
            cakedate: communityToUpdate!.cakedate,
            description: description,
            pfp: communityToUpdate!.pfp,
            banner: communityToUpdate!.banner,
        }

        await updateCommunity(community.id, community);
        window.location.href = `/communities/${community.name}`;
    }

    return (
    <div className="signup-container">
        <h2>Edit community</h2>
        <label htmlFor="name-input">Title:</label>
        <input type="text" value={communityName} onChange={(e) => setCommunityName(e.target.value)} id="name-input" name="name-input" placeholder="Enter a name" />
        <label htmlFor="text-input">Text:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} id="description-input" name="description-input" placeholder="Enter a description" />
        <button onClick={update}>Submit</button>
    </div>);
}

export function SubmitModeratorForm() {
    const {name} = useParams();

    const [moderatorName, setModeratorName] = useState("");
    const [password, setPassword] = useState("");

    function create() {
        if(users.some(u => u.name === moderatorName) && password === user!.password) {
            let userToModerator: UserProps = users.find(u => u.name === moderatorName)!;
            let community: CommunityProps = communities.find(c => c.name === name)!;
            
            let moderator: ModeratorProps = {
                id: 0,
                user: userToModerator,
                community: community
            }

            createModerator(moderator);
        }

        window.location.href = `/communities/${name}`;
    }

    return (
        <div className="signup-container">
            <h2>{`Add moderator to i/${name}`}</h2>
            <label htmlFor="name-input">Moderator name:</label>
            <input type="text" value={moderatorName} onChange={(e) => setModeratorName(e.target.value)} id="name-input" name="name-input" placeholder="Enter moderator name" />
            <label htmlFor="password-input">Your password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password-input" name="password-input" placeholder="Enter your password" />
            <button onClick={create}>Submit</button>
        </div>
    );
}