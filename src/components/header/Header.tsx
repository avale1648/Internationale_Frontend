import { Link } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import "./styles.css";
import SIGN_UP from "../../assets/registration.svg";
import SIGN_IN from "../../assets/login.svg";
import SIGN_OUT from "../../assets/logout.svg";

export function Header() {
    return (
        <div className='header'>
            <div className="header-sub-left">
                <img className='header-img' src={LOGO} alt="logo" />
            </div>
            <div className="header-sub">
                <input type='text' className='searchbar' placeholder='Search...'></input>
            </div>
            <div className="header-sub-right">
            <div className="header-sub">
                <Link to='/signup'>
                    <div className="header-button" data-title='Sign up'>
                    <img src={SIGN_UP} alt="" />
                    </div>
                </Link>
                <Link to=''>
                <div className="header-button" data-title='Sign in'>
                    <img src={SIGN_IN} alt="" />
                    </div>
                </Link>
                <div className="header-button" data-title='Sign out'>
                    <img src={SIGN_OUT} alt="" />
                    </div>
                </div>
            </div>
            
        </div>
    )
}