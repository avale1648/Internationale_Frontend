import { useState } from "react";
import { createUser, getUsers, updateUser } from "../../api/UserService";
import UserProps from "../../props/UserProps";
import { useParams } from "react-router-dom";

const users: UserProps[] = await getUsers();

export function SigninForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function signin() {
        const user = users.find(u => u.name === name && u.password === password);

        if (user !== null) {
            localStorage.setItem("user_id", `${user!.id}`);
            window.location.href = `/users/${user!.name}`;
        }
    }

    return (
        <div className="signup-container">
            <h2>Sign in</h2>
            <label htmlFor="name-input">Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name-input" name="name-input" placeholder="Name" />
            <label htmlFor="password-input">Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password-input" name="password-input" placeholder="Password" />
            <button onClick={signin}>Submit</button>
        </div>
    );
}

export default function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");

    function signup() {
        const cakedate = new Date(Date.now()).toISOString();
        let user: UserProps = {
            id: 0,
            name: name,
            email: email,
            password: password,
            birthdate: birthdate,
            rating: 0,
            role: "user",
            cakedate: cakedate,
            description: "",
            pfp: "",
            banner: ""
        };

        createUser(user);
        let created_id: number | undefined = users.find(u =>  u.name === user.name)?.id;
        localStorage.setItem("user_id", `${Number(created_id)}`);
        window.location.href = `/users/${user!.name}`;
    }

    return (
        <div className="signup-container">
            <h2>Sign up</h2>
            <label htmlFor="name-input">Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name-input" name="name-input" placeholder="Name" />
            <label htmlFor="email-input">Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email-input" name="email-input" placeholder="me@example.com" />
            <label htmlFor="password-input">Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password-input" name="password-input" placeholder="Password" />
            <label htmlFor="birthdate-input">Birthdate:</label>
            <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} id="birthdate-input" name="birthdate-input" />
            <button onClick={signup}>Submit</button>
        </div>
    );
}

export function EditUserForm() {
    const {name} = useParams();
    const userToUpdate = users.find(p => p.name === name);

    const [username, setUsername] = useState(userToUpdate!.name);
    const [description, setDescription] = useState(userToUpdate?.description);

    async function update() {
        let user: UserProps = {
            id: userToUpdate!.id,
            name: username,
            email: userToUpdate!.email,
            password: userToUpdate!.password,
            birthdate: userToUpdate!.birthdate,
            rating: userToUpdate!.rating,
            role: userToUpdate!.role,
            cakedate: userToUpdate!.cakedate,
            description: description!,
            pfp: userToUpdate!.pfp,
            banner: userToUpdate!.banner
        }

        await updateUser(user.id, user);
        window.location.href = `/users/${user.name}`;
    }

    return (
    <div className="signup-container">
        <h2>Edit user's profile</h2>
        <label htmlFor="name-input">Title:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="name-input" name="name-input" placeholder="Enter a name" />
        <label htmlFor="text-input">Text:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} id="description-input" name="description-input" placeholder="Enter a description" />
        <button onClick={update}>Submit</button>
    </div>);
}

export function setUser(user: UserProps) {
    localStorage.setItem("user_id", `${user.id}`);
}

export function signout() {
    localStorage.removeItem("user_id");
    window.location.href="/posts/new";
}