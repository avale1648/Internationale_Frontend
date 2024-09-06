import DEFAULT_USER_PFP from "../../assets/default-user-pfp.png";
import DEFAULT_COMMUNITY_PFP from "../../assets/default-community-pfp.png";
import RATING_UP from "../../assets/rating-up.svg";
import RATING_DOWN from "../../assets/rating-down.svg";
import EDIT from '../../assets/registration.svg';
import DELETE from '../../assets/bin.svg';
import { Media } from "../Media";
import PostProps from "../../props/PostProps";
import './styles.css';
import { Link } from "react-router-dom";
import UserProps from "../../props/UserProps";
import { getUserById } from "../../api/UserService";
import { deletePost } from "../../api/PostService";

let moderators: UserProps[] | undefined;
const userId: number = Number(localStorage.getItem("user_id"));
const user: UserProps| undefined = localStorage.getItem("user_id") !== null? await getUserById(userId): undefined;

export function Post({ props }: { props: PostProps }) {
    const communityPfp = props.community === null || props.community!.pfp === null || props.community!.pfp === '' ? DEFAULT_COMMUNITY_PFP : props.community!.pfp;
    const userPfp = props.user.pfp === null || props.user.pfp === '' ? DEFAULT_USER_PFP : props.user.pfp;
    const date = new Date(props.postDate);
    const postDate_format = `${date.toLocaleDateString("ru-RU")}, ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`

    let buttons = <div></div>;

    let editButton = 
        <div className="post-header-button">
            <Link to={`/posts/edit/${props.id}`}>
                <img src={EDIT} alt="edit" />
            </Link>
        </div>;

    let deleteButton = 
    <div className="post-header-button" onClick={() => delete_post(props.id)}>
        <img src={DELETE} alt="delete" />
    </div>;

    //если запись опубликована пользователем, под которым выполнен вход:
    if(props.user.id === user?.id) {
        //добавляются кнопки редактирования и удаления
        buttons = 
        <div className="post-header-button-container">
           {editButton}
           {deleteButton}
        </div>
    }
    //если запись опубликована другим пользователем, но пользователь, под которым выполнен вход является
    //главным администратором, администратором, основателем сообщества, в котором опубликована запись
    //или модератором сообщества, в котором опубликована запись:
    if(user?.id !== props.user.id && (user?.role === "main_admin" 
        || user?.role === "admin"
        || user?.id === props.community?.founder.id
        || moderators?.includes(user!))) {
        //добавляется кнопка удаления записи
        buttons = 
        <div className="post-header-button-container">
            {deleteButton}
        </div>
    }

    let header;
    if (props.community !== null) {
        header = <div>
            <div className='post-header'>
                <img src={communityPfp} alt='community-pfp'></img>
                <Link to={`/communities/${props.community!.name}`}>i/{props.community!.name}</Link>&nbsp;
                <span>by <Link to={`/users/${props.user.name}`}>c/{props.user.name}</Link>, {postDate_format}</span>
                {buttons}
            </div>
        </div>
    }

    if (props.community === null) {
        header = <div>
            <div className='post-header'>
                <img src={userPfp} alt='user-pfp'></img>
                <Link to={`/users/${props.user.name}`}>u/{props.user.name}</Link>, {postDate_format}
                {buttons}
            </div>
        </div>
    }

    if (props.parentPost !== null) {
            header = <div>
                <div className='post-header'>
                    <img src={userPfp} alt='user-pfp'></img>
                    <Link to={`/users/${props.user.name}`}>u/{props.user.name}</Link>, {postDate_format},  reply to&nbsp;<Link to={`/posts/${props.parentPost!.id}`}>{`${props.parentPost!.user.name}-${props.parentPost!.postDate}`}</Link>
                    {buttons}
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
            {header}
            {CONTENT}
            <div className='post-footer'>
                <div className='post-rating'>
                    <div className='post-rating-div'>{props.rating}</div>
                    <button id={`rating-up-${props.id}`} onClick={() => ratingUp(props, `rating-up-${props.id}`)}>
                        <img src={RATING_UP} alt='rating-up'></img>
                    </button>
                    <button id={`rating-down-${props.id}`} onClick={() => ratingDown(props, `rating-down-${props.id}`)}>
                        <img src={RATING_DOWN} alt='rating-down'></img>
                    </button>
                </div>
            </div>
        </div>

    );
}

function ratingUp(props: PostProps, id: string) {
    if (document.getElementById(id)?.className === null || document.getElementById(id)?.className === '') {
        document.getElementById(id)!.className = 'post-rating-pressed';
    } else {
        document.getElementById(id)!.className = '';
    }
}

function ratingDown(props: PostProps, id: string) {
    if (document.getElementById(id)?.className === null || document.getElementById(id)?.className === '') {
        document.getElementById(id)!.className = 'post-rating-pressed';
    } else {
        document.getElementById(id)!.className = '';
    }
}

function delete_post(id: number) {
    deletePost(id);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
}