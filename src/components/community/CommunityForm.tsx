import { useState } from "react";
import UserProps from "../../props/UserProps";
import { getUsers } from "../../api/UserService";
import CommunityProps from "../../props/CommunityProps";
import { createCommunity } from "../../api/CommunityService";

const users: UserProps[] = await getUsers();

export function CommunityForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [mature, setMature] = useState("false");

    async function create() {
        const user:UserProps= users.find(u => u.id === Number(localStorage.getItem("user_id")))!;
        const cakedate = new Date(Date.now()).toISOString();
        
        let community: CommunityProps = {
            id: 0,
            founder: user,
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