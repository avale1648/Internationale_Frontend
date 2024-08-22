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

const linkStyle = {
  textDecoration: "none"
};

export function Sidebar({active}:{active: string}) {
  return (
    <div className="sidebar">
      <Link to='/users/me' style={linkStyle}>
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
    </div>
    /*<div className='sidebar'>
    <div className="form_radio_group">
      
        <div className="form_radio_group_item">
            <input id="radio-1" type="radio" name="radio" value="1"/>
            <label htmlFor="radio-1">Профиль</label>
        </div>
        <div className="form_radio_group_item">
            <input id="radio-2" type="radio" name="radio" value="2"/>
            <label htmlFor="radio-2">Подписки</label>
        </div>
        <div className="form_radio_group_item">
            <input id="radio-3" type="radio" name="radio" value="3"/>
            <label htmlFor="radio-3">Популярное</label>
        </div>
          <div className="form_radio_group_item">
            <input id="radio-4" type="radio" name="radio" value="4"/>
            <label htmlFor="radio-4">Новое</label>
        </div>
          <div className="form_radio_group_item">
            <input id="radio-5" type="radio" name="radio" value="5"/>
            <label htmlFor="radio-5">Товарищи</label>
        </div>
          <div className="form_radio_group_item">
            <input id="radio-6" type="radio" name="radio" value="6"/>
            <label htmlFor="radio-6">Советы</label>
        </div>
          <div className="form_radio_group_item">
            <input id="radio-7" type="radio" name="radio" value="7"/>
            <label htmlFor="radio-7">О L'Internationale</label>
        </div>
    </div>
  </div>*/);
}