import UserProps from "../../props/UserProps";

export function setUser(user: UserProps) {
    localStorage.setItem("user", JSON.stringify(user));
}

export function signout() {
    localStorage.clear();
    window.location.href="/posts/new";
}