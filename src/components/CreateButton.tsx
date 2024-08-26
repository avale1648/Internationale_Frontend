import "./styles.css";
import { Link } from "react-router-dom";
import PLUS from "../assets/plus.svg";

export function CreateButton({url,text}:{url:string, text:string}) {
    const linkStyle = {
        width:"50%",
        height:"50px",
        color:"black",
        textDecoration:"none"
    };

    return(
        <Link to={url} style={linkStyle}>
        <div className="create-button">
            <img src={PLUS} alt="" />
            {text}
        </div>
        </Link>);
}