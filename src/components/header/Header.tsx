import LOGO from "../../assets/logo.png";
import "./styles.css";

export function Header() {
    return (
        <div className='header'>
            <img className='header-img' src={LOGO} alt="logo" />
            <input type='text' className='searchbar' placeholder='Search...'></input>
            <button className='header-button'>Sign In</button>
        </div>
    )
}