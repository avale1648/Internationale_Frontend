import UserProps from '../../props/UserProps';
import './styles.css';
import RATING from '../../assets/rating.svg';
import REGISTRATION from '../../assets/registration.svg';
import { Link } from 'react-router-dom';
import UserSubscriptionProps from '../../props/UserSubscriptionProps';
import { getUserById } from '../../api/UserService';
import { createUserSubscription, deleteUserSubscription, getUserSubscriptions } from '../../api/UserSubscriptionService';

const userId: number = Number(localStorage.getItem("user_id"));
const user: UserProps | undefined = localStorage.getItem("user_id") === null ? undefined : await getUserById(userId);
const subscriptions: UserSubscriptionProps[] = await getUserSubscriptions();

export function User({ props }: { props: UserProps }) {
    const date = new Date(props.cakedate);
    const cakedate_format = `${date.toLocaleDateString("ru-RU")}`;

    const linkStyle = { textDecoration: "none", color: "black" };

    let editButton =
        <Link to={`/users/${props.name}/edit`} style={linkStyle}>
            <div className="user-header-button">
                Edit profile
            </div>
        </Link>;

    let subscribeButton =
        <button className="user-header-button" id={`subscribe-button-${props.id}`} onClick={() => subscribe(props)}>
            {subscriptions.some(us => us.subscriber.id === user!.id && us.author.id === props.id) ? "Unsubscribe" : "Subscribe"}
        </button>;

    let button = <div></div>;

    if (props.id.toString() === localStorage.getItem("user_id")) {
        button = editButton;
    } else {
        button = subscribeButton;
    }

    return (
        <div className='user'>
            <img className="user-banner" src={props.banner} alt='banner' />
            <div className='user-header'>
                <img src={props.pfp} alt='pfp' />
                <h2>{'с/' + props.name}</h2>
                {button}
            </div>
            <div className='user-info'>
                <div className='user-info-sub' data-title='Рейтинг'>
                    <img src={RATING} alt='rating' />
                    {props.rating}
                </div>
                <div className='user-info-sub' data-title='Дата регистрации'>
                    <img src={REGISTRATION} alt='cakedate'></img>
                    {cakedate_format}
                </div>
            </div>
            <div className='user-description'>{props.description}</div>
        </div>
    );
}

export function UserPreview({ userProps }: { userProps: UserProps }) {

    const linkStyle = {
        textDecoration: "none",
        color: "black",
        width: "50%"
    }

    return (
        <Link to={`/users/${userProps.name}`} style={linkStyle}>
            <div className='user-preview'>
                <img src={userProps.pfp} alt='pfp' />
                <h5>u/{userProps.name}</h5>
            </div>
        </Link>
    );
}

function subscribe(props: UserProps) {
    let subscriptionToDelete = subscriptions.find(us => us.subscriber.id === user!.id && us.author.id === props.id);

    if (user !== undefined) {
        if (subscriptions.includes(subscriptionToDelete!)) {
            deleteUserSubscription(subscriptionToDelete!.id);
        } else {
            let subscription: UserSubscriptionProps = {
                id: 0,
                subscriber: user!,
                author: props
            }

            createUserSubscription(subscription);
        }
    }

    // eslint-disable-next-line no-restricted-globals
    location.reload();
}