import { Link } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import "./styles.css";
import SIGN_UP from "../../assets/registration.svg";
import SIGN_IN from "../../assets/login.svg";
import SIGN_OUT from "../../assets/logout.svg";
import { signout } from "../user/UserForms";

export function Header() {
    return (
        <div className='header'>
            <div className="header-sub-left">
                <img className='header-img' src={LOGO} alt="logo" />
            </div>
            <div className="header-sub">
            </div>
            <div className="header-sub-right">
            <div className="header-sub">
                <Link to='/signup'>
                    <div className="header-button" data-title='Sign up'>
                    <img src={SIGN_UP} alt="signup" />
                    </div>
                </Link>
                <Link to='/signin'>
                <div className="header-button" data-title='Sign in'>
                    <img src={SIGN_IN} alt="signin" />
                    </div>
                </Link>
                <div className="header-button" onClick={signout} data-title='Sign out'>
                    <img src={SIGN_OUT} alt="signout" />
                    </div>
                </div>
            </div>
            
        </div>
    )
}