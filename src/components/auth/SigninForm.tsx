import './styles.css';
import { useState } from "react";
import UserProps from "../../props/UserProps";
import { getUsers } from "../../api/UserService";
import { setUser } from "./AuthUtil";

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