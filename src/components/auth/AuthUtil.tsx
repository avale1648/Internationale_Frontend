import UserProps from "../../props/UserProps";

export function setUser(user: UserProps) {
    localStorage.setItem("user_id", `${user.id}`);
}

export function signout() {
    localStorage.removeItem("user_id");
    window.location.href="/posts/new";
}