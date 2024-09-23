import './styles.css'
import { useState } from "react";
import UserProps from "../../props/UserProps";
import { createUser, getUsers } from "../../api/UserService";

const users: UserProps[] = await getUsers();
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