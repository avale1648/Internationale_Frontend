import "./styles.css";
import { Link } from "react-router-dom";
import PLUS from "../../assets/plus.svg";

export function PostCreator() {

    return(
        <div className="post-creator">
            <Link to='/posts/submit'>
            <img src={PLUS} alt="" />
            <span>New post</span>
            </Link>
        </div>);
}