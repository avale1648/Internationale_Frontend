import DEFAULT_USER_PFP from "../../assets/default-user-pfp.png";
import DEFAULT_COMMUNITY_PFP from "../../assets/default-community-pfp.png";
import RATING_UP from "../../assets/rating-up.svg";
import RATING_DOWN from "../../assets/rating-down.svg";
import COMMENTS from "../../assets/comment-icon.svg";
import { Media } from "../Media";
import PostProps from "../../props/PostProps";
import './styles.css';
import { text } from "stream/consumers";


export function Post({ props }: { props: PostProps }) {
    const communityPfp = props.community.pfp === null || props.community.pfp === '' ? DEFAULT_COMMUNITY_PFP : props.community.pfp;
    const userPfp = props.user.pfp === null || props.user.pfp === '' ? DEFAULT_USER_PFP : props.user.pfp;
    const date = new Date(props.postDate);
    const postDate_format = `${date.toLocaleDateString("ru-RU")}, ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
    const commentCount = 0;

    let HEADER;
    if (props.community !== null) {
        HEADER = <div>
            <div className='post-header'>
            <img src={communityPfp} alt='community-pfp'></img>
                <a href="">i/{props.community.name}</a>&nbsp;
                <span>by <a href="">c/{props.user.name}</a>, {postDate_format}</span>
            </div>
        </div>
    } else {
        HEADER = <div>
            <div className='post-header'>
                <img src={userPfp} alt='community-pfp'></img>
                <a href=""><h5>u/{props.user.name}</h5></a>
                {postDate_format}
            </div>
        </div>
    }

    let CONTENT;
    if (props.file !== null && props.file !== '') {
        CONTENT = <div>
            <h3>{props.title}</h3>
            <br />
            <p>{props.text}</p>
            <div className='post-img'>
                <Media file={props.file}></Media>
            </div>
        </div>
    } else {
        CONTENT = <div>
            <h3>{props.title}</h3>
            <p>{props.text}</p>
            <br />
        </div>
    }

    return (
        <div className='post'>
            {HEADER}
            {CONTENT}
            <div className='post-footer'>
                <div className='post-rating'>
                    <div className='post-rating-div'>{props.rating}</div>
                    <button id={`rating-up-${props.id}`} onClick={()=>ratingUp(props, `rating-up-${props.id}`)}>
                        <img src={RATING_UP} alt = 'rating-up'></img>
                    </button>
                    <button  id={`rating-down-${props.id}`} onClick={()=>ratingDown(props, `rating-down-${props.id}`)}>
                        <img src={RATING_DOWN} alt='rating-down'></img>
                    </button>
                </div>
                <button className='post-comments'>
                    <img src={COMMENTS} alt='comments'></img> 
                    <span> {commentCount}</span>
                </button>
            </div>
        </div>

    );
}

function ratingUp(props: PostProps, id: string) {
    if(document.getElementById(id)?.className === null || document.getElementById(id)?.className === '') {
        document.getElementById(id)!.className = 'post-rating-pressed';
    } else {
        document.getElementById(id)!.className = '';
    }
}

function ratingDown(props: PostProps, id: string) {
    if(document.getElementById(id)?.className === null || document.getElementById(id)?.className === '') {
        document.getElementById(id)!.className = 'post-rating-pressed';
    } else {
        document.getElementById(id)!.className = '';
    }
}