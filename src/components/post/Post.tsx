import DEFAULT_USER_PFP from "../../assets/default-user-pfp.png";
import DEFAULT_COMMUNITY_PFP from "../../assets/default-community-pfp.png";
import RATING_UP from "../../assets/rating-up.svg";
import RATING_DOWN from "../../assets/rating-down.svg";
import EDIT from '../../assets/registration.svg';
import DELETE from '../../assets/bin.svg';
import REPLIES from '../../assets/comment-icon.svg';
import reply_icon from '../../assets/reply.svg';
import { Media } from "../Media";
import PostProps from "../../props/PostProps";
import './styles.css';
import { Link } from "react-router-dom";
import UserProps from "../../props/UserProps";
import { getUserById } from "../../api/UserService";
import { createPost, deletePost, getPosts, updatePost } from "../../api/PostService";
import RatingProps from "../../props/RatingProps";
import { createRating, deleteRating, getRatings } from "../../api/RatingService";
import { useState } from "react";

const ratings: RatingProps[] = await getRatings();
const posts: PostProps[] = await getPosts();
let moderators: UserProps[] | undefined;
const userId: number = Number(localStorage.getItem("user_id"));
const user: UserProps | undefined = localStorage.getItem("user_id") === null ? undefined : await getUserById(userId);

export function PostPreview({ props }: { props: PostProps }) {
    let header = initHeader(props);
    let content = initContent(props);
    let footer = initFooterPreview(props);

    return (
        <div className='post-preview'>
            {header}
            {content}
            {footer}
        </div>
    );
}

export function Post({ props }: { props: PostProps }) {
    let header = initHeader(props);
    let content = initContent(props);
    let footer = initFooter(props);
    let replies = posts.filter(p => p.parentPost?.id === props.id);
    replies.sort(compareByDate);

    function compareByDate(a: PostProps, b: PostProps) {
        let result = 0;
        let aDate = Date.parse(a.postDate);
        let bDate = Date.parse(b.postDate);

        if (aDate < bDate) {
            result = -1;
        }
        if (aDate > bDate) {
            result = 1;
        }

        return result;
    }

    //ответы в виде элемента
    //значение по умолчанию - пустой разделитель для ответа, на который нет ответов
    let repliesContent = <div></div>;

    //если пост родительский и на него нет ответов
    if (props.parentPost === null && replies.length === 0) {
        repliesContent = <p>There is no replies, share your thoughts!</p>
    }

    //если есть ответы 
    if (replies.length !== 0) {
        repliesContent =
            <div>
                {replies.map(p => <Post props={p} key={p.id}></Post>)}
            </div>
    }

    return (
        <div className='post'>
            {header}
            {content}
            {footer}
            <PostReplier props={props}></PostReplier>
            <div className="replies-container">
                {repliesContent}
            </div>
        </div>);
}

function initHeader(props: PostProps) {
    const communityPfp = props.community === null || props.community!.pfp === null || props.community!.pfp === '' ? DEFAULT_COMMUNITY_PFP : props.community!.pfp;
    const userPfp = props.user.pfp === null || props.user.pfp === '' ? DEFAULT_USER_PFP : props.user.pfp;
    const date = new Date(props.postDate);
    const postDate_format = `${date.toLocaleDateString("ru-RU")}, ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;

    function initButtons(props: PostProps) {
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
        if (props.user.id === user?.id) {
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
        if (user?.id !== props.user.id && (user?.role === "main_admin"
            || user?.role === "admin"
            || user?.id === props.community?.founder.id
            || moderators?.includes(user!))) {
            //добавляется кнопка удаления записи
            buttons =
                <div className="post-header-button-container">
                    {deleteButton}
                </div>
        }

        return buttons;
    }

    let buttons = initButtons(props);

    let header =
        <div>
            <div className='post-header'>
                <img src={userPfp} alt='user-pfp'></img>
                <Link to={`/users/${props.user.name}`}>u/{props.user.name}</Link>, {postDate_format}
                {buttons}
            </div>
        </div>

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

    if (props.parentPost !== null) {
        header = <div>
            <div className='post-header'>
                <img src={userPfp} alt='user-pfp'></img>
                <Link to={`/users/${props.user.name}`}>u/{props.user.name}</Link>, {postDate_format},  reply to&nbsp;<Link to={`/posts/${props.parentPost!.id}`}>{`${props.parentPost!.user.name}-${props.parentPost!.postDate}`}</Link>
                {buttons}
            </div>
        </div>
    }

    return header;
}

function initContent(props: PostProps) {
    let content =
        <div className="post-content">
            <h3>{props.title}</h3>
            <p>{props.text}</p>
            <br />
        </div>;

    if (props.file !== null && props.file !== '') {
        content = <div className="post-content">
            <h3>{props.title}</h3>
            <br />
            <p>{props.text}</p>
            <div className='post-img'>
                <Media file={props.file}></Media>
            </div>
        </div>
    }

    return content;
}

function initFooterPreview(props: PostProps) {
    const linkStyle = {
        textDecoration: "none",
        color: "black"
    };

    let repliesCount = posts.filter(p => p.parentPost?.id === props.id).length;

    return (
        <div className='post-footer'>
            <div className='post-rating'>
                <div className='post-rating-div'>{props.rating}</div>
                <button className='unpressed' id={`rating-up-${props.id}`} onLoad={() => buttonUpOnLoad(props, `rating-up-${props.id}`)} onClick={() => ratingUp(props, `rating-up-${props.id}`, `rating-down-${props.id}`)}>
                    <img src={RATING_UP} alt='rating-up'></img>
                </button>
                <button className='unpressed' id={`rating-down-${props.id}`} onLoad={() => buttonDownOnLoad(props, `rating-down-${props.id}`)} onClick={() => ratingDown(props, `rating-down-${props.id}`, `rating-up-${props.id}`)}>
                    <img src={RATING_DOWN} alt='rating-down'></img>
                </button>
            </div>
            <Link to={`/posts/${props.id}`} style={linkStyle}>
                <div className="post-comments">
                    <img src={REPLIES} alt="replies" />
                    <span>Replies {repliesCount}</span>
                </div>
            </Link>
        </div>);
}

function PostReplier({ props }: { props: PostProps }) {
    const [text, setText] = useState("");

    function createReply() {
        const postdate = new Date(Date.now()).toISOString();

        let reply: PostProps = {
            id: 0,
            user: user!,
            parentPost: props,
            title: "",
            text: text,
            postDate: postdate,
            rating: 0,
            file: ""
        }
        createPost(reply);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    return (
        <div className="post-replier" id={`post-replier-${props.id}`} hidden>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} id="text-input" name="text-input" placeholder="Enter a text" />
            <button onClick={createReply}>
                Reply
            </button>
        </div>
    );
}

function initFooter(props: PostProps) {
    function showReplier() {
        document.getElementById(`post-replier-${props.id}`)!.hidden = !document.getElementById(`post-replier-${props.id}`)!.hidden;
    }

    return (
        <div className='post-footer'>
            <div className='post-rating'>
                <div className='post-rating-div'>{props.rating}</div>
                <button className='unpressed' id={`rating-up-${props.id}`} onLoad={() => buttonUpOnLoad(props, `rating-up-${props.id}`)} onClick={() => ratingUp(props, `rating-up-${props.id}`, `rating-down-${props.id}`)}>
                    <img src={RATING_UP} alt='rating-up'></img>
                </button>
                <button className='unpressed' id={`rating-down-${props.id}`} onLoad={() => buttonDownOnLoad(props, `rating-down-${props.id}`)} onClick={() => ratingDown(props, `rating-down-${props.id}`, `rating-up-${props.id}`)}>
                    <img src={RATING_DOWN} alt='rating-down'></img>
                </button>
            </div>
            <div className="post-comments" onClick={() => showReplier()} id={`post-comments-${props.id}`}>
                <img src={reply_icon} alt="replies" />
                <span>Reply</span>
            </div>
        </div>);
}

function buttonUpOnLoad(props: PostProps, id: string) {
    let ratingUpExists = ratings.some(r => r.post.id === props.id && r.user.id === user?.id && r.value === "up");

    if (ratingUpExists) {
        document.getElementById(id)!.className = 'pressed';

    } else {
        document.getElementById(id)!.className = 'unpressed';
    }
}

function buttonDownOnLoad(props: PostProps, id: string) {
    let ratingUpExists = ratings.some(r => r.post.id === props.id && r.user.id === user?.id && r.value === "down");

    if (ratingUpExists) {
        document.getElementById(id)!.className = 'pressed';

    } else {
        document.getElementById(id)!.className = 'unpressed';
    }
}

function ratingUp(props: PostProps, this_id: string, other_id: string) {
    if (user !== undefined) {
        let rating = ratings.find(r => r.post.id === props.id);
        let ratingToPost: RatingProps = {
            id: 0,
            user: user!,
            post: props!,
            value: "up"
        }
        //если рейтинг вверх была ненажатой
        if (document.getElementById(this_id)?.className === 'unpressed') {
            //сделать рейтинг вверх нажатой
            //+1
            //ratings: create user, post, value
            document.getElementById(this_id)!.className = 'pressed';
            createRating(ratingToPost);
            updatePostRating(props, 1);
        } else {
            //сделать рейтинг вверх ненажатой
            //-1
            document.getElementById(this_id)!.className = 'unpressed';
            if (ratings.includes(rating!)) {
                deleteRating(rating!.id);
            }
            updatePostRating(props, -1);
        }
        //если рейтинг вниз была нажатой
        if (document.getElementById(other_id)?.className === 'pressed') {
            //сделать рейтинг вниз ненажатой
            //сделать рейтинг вверх нажатой
            //+2
            document.getElementById(other_id)!.className = 'unpressed';
            document.getElementById(this_id)!.className = 'pressed';
            if (ratings.includes(rating!)) {
                deleteRating(rating!.id);
            }
            createRating(ratingToPost);
            updatePostRating(props, 2);
        }
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    } else {
        window.location.href = "/signup";
    }

}

function ratingDown(props: PostProps, this_id: string, other_id: string) {
    if (user !== undefined) {
        let rating = ratings.find(r => r.post.id === props.id);
        let ratingToPost: RatingProps = {
            id: 0,
            user: user!,
            post: props!,
            value: "down"
        }
        if (document.getElementById(this_id)?.className === 'unpressed') {
            //сделать рейтинг вверх нажатой
            //+1
            //ratings: create user, post, value
            document.getElementById(this_id)!.className = 'pressed';
            createRating(ratingToPost);
            updatePostRating(props, -1);
        } else {
            //сделать рейтинг вверх ненажатой
            //-1
            document.getElementById(this_id)!.className = 'unpressed';
            if (ratings.includes(rating!)) {
                deleteRating(rating!.id);
            }
            updatePostRating(props, 1);
        }
        if (document.getElementById(other_id)?.className === 'pressed') {
            //-2
            document.getElementById(other_id)!.className = 'unpressed';
            document.getElementById(this_id)!.className = 'pressed';
            if (ratings.includes(rating!)) {
                deleteRating(rating!.id);
            }
            createRating(ratingToPost);
            updatePostRating(props, -2);
        }
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    } else {
        window.location.href = "/signup";
    }
}

function updatePostRating(props: PostProps, value: number) {
    let post: PostProps = {
        id: props.id,
        user: props.user,
        community: props.community,
        parentPost: props.parentPost,
        title: props.title,
        text: props.text,
        postDate: props.postDate,
        rating: props.rating + value,
        file: props.file
    };

    updatePost(props.id, post);
}

function delete_post(id: number) {
    deletePost(id);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
}