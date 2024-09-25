import "./styles.css";
import { Link, } from "react-router-dom";
import PROFILE from "../../assets/user.svg";
import NEW from "../../assets/new.svg";
import POPULAR from "../../assets/rating.svg";
import SUBSCRIPTIONS from "../../assets/bell.svg";
import USERS from "../../assets/users.svg";
import COMMUNITIES from "../../assets/flag.svg";
import MESSAGES from "../../assets/message.svg";
import ABOUT from "../../assets/star.svg";
import UserProps from "../../props/UserProps";
import { getUserById } from "../../api/UserService";

const linkStyle = {
  textDecoration: "none"
};
const userId: number = Number(localStorage.getItem("user_id"));
const user: UserProps| undefined = localStorage.getItem("user_id") !== null? await getUserById(userId): undefined;
export function Sidebar({active}:{active: string}) {
  
  return (
    <div className="sidebar">
      <Link to={localStorage.getItem("user_id") === null || localStorage.getItem("user_id") === ""?"/signin": `/users/${user?.name}`} style={linkStyle}>
        <div className={active === "profile"? "active-sidebar-element": "sidebar-element"}>
          <img src={PROFILE} alt="user" />
          Profile
        </div>
      </Link>
      <Link to='/posts/new' style={linkStyle}>
        <div className={active === "new"? "active-sidebar-element": "sidebar-element"}>
          <img src={NEW} alt="new" />
          New
        </div>
      </Link>
      <Link to='/posts/popular' style={linkStyle}>
        <div className={active === "popular"? "active-sidebar-element": "sidebar-element"}>
          <img src={POPULAR} alt="popular" />
          Popular
        </div>
      </Link>
      <Link to='/posts/subscribed' style={linkStyle}>
        <div className={active === "subscriptions"? "active-sidebar-element": "sidebar-element"}>
          <img src={SUBSCRIPTIONS} alt="subscriptions" />
          Subscriptions
        </div>
      </Link>
      <Link to='/users' style={linkStyle}>
        <div className={active === "users"? "active-sidebar-element": "sidebar-element"}>
          <img src={USERS} alt="users" />
          Users
        </div>
      </Link>
      <Link to='/communities' style={linkStyle}>
        <div className={active === "communities"? "active-sidebar-element": "sidebar-element"}>
          <img src={COMMUNITIES} alt="communities" />
          Communities
        </div>
      </Link>
      <Link to='/messages' style={linkStyle}>
        <div className={active === "messages"? "active-sidebar-element": "sidebar-element"}>
          <img src={MESSAGES} alt="messages" />
          Messages
        </div>
      </Link>
      <Link to='/about' style={linkStyle}>
        <div className={active === "about"? "active-sidebar-element": "sidebar-element"}>
          <img src={ABOUT} alt="about" />
          About L'Internationale
        </div>
      </Link>
    </div>);
}