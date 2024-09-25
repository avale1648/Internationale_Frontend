import CommunityProps from "../../props/CommunityProps";
import RATING from '../../assets/rating.svg';
import REGISTRATION from '../../assets/registration.svg';
import MATURE from '../../assets/mature.svg';
import UNMATURE from '../../assets/unmature.svg';
import FOUNDER from '../../assets/user.svg';
import './styles.css';
import { Link } from "react-router-dom";
import CommunitySubscriptionProps from "../../props/CommunitySubscriptionProps";
import { createCommunitySubscription, deleteCommunitySubscription, getCommunitySubscriptions } from "../../api/CommunitySubscriptionServise";
import UserProps from "../../props/UserProps";
import { getUserById } from "../../api/UserService";

const userId: number = Number(localStorage.getItem("user_id"));
const user: UserProps | undefined = localStorage.getItem("user_id") === null ? undefined : await getUserById(userId);
const subscriptions: CommunitySubscriptionProps[] = await getCommunitySubscriptions();

export function Community({ props }: { props: CommunityProps }) {
  const date = new Date(props.cakedate);
  const cakedate_format = `${date.toLocaleDateString("ru-RU")}`;
  const mature = props.mature === true ? MATURE : UNMATURE;

  const linkStyle = { textDecoration: "none", color: "black" };

  let editButton =
    <Link to={`/communities/${props.name}/edit`} style={linkStyle}>
      <div className="community-header-button">
        Edit community
      </div>
    </Link>;

  let subscribeButton =
    <button className="community-header-button" id={`subscribe-button-${props.id}`} onClick={() => subscribe(props)}>
      {subscriptions.some(us => us.user.id === user!.id && us.community.id === props.id) ? "Unsubscribe" : "Subscribe"}
    </button>;

  let addModeratorButton = <Link to={`/moderators/${props.name}`} style={linkStyle}>
    <div className="community-header-button">
      Add moderator
    </div>
  </Link>;

  let buttons = <div></div>;

  if (props.founder.id.toString() === localStorage.getItem("user_id")) {
    buttons = <div className="community-header-button-group">
      {editButton}
    </div>
  } else {
    buttons = subscribeButton;
  }

  return (<div className='community'>
    <img className='community-banner' src={props.banner} alt='banner'></img>
    <div className='community-header'>
      <img src={props.pfp} alt='pfp'></img>
      <h2>{'i/' + props.name}</h2>
      {buttons}
    </div>
    <div className='community-info'>
      <div className='community-info-sub' data-title='Рейтинг'>
        <img src={RATING} alt='rating'></img>
        {props.rating}
      </div>
      <div className='community-info-sub' data-title='Возрастное ограничение'>
        <img src={mature} alt="mature" />
      </div>
      <div className='community-info-sub' data-title='Дата создания'>
        <img src={REGISTRATION} alt='registration'></img>
        {cakedate_format}
      </div>
      <div className='community-info-sub' data-title='Создатель сообщества'>
        <img src={FOUNDER} alt='founder'></img>
        {props.founder.name}
      </div>
    </div>
    <div className='community-description'>{props.description}</div>
  </div>);
}

export function CommunityPreview({ props }: { props: CommunityProps }) {
  const linkStyle = {
    textDecoration: "none",
    color: "black",
    width: "50%"
  }

  return (
    <Link to={`/communities/${props.name}`} style={linkStyle}>
      <div className='community-preview'>
        <img src={props.pfp} alt='pfp' />
        <h5>i/{props.name}</h5>
      </div>
    </Link>
  );
}

function subscribe(props: CommunityProps) {
  let subscriptionToDelete = subscriptions.find(us => us.user.id === user!.id && us.community.id === props.id);

  if (user !== undefined) {
    if (subscriptions.includes(subscriptionToDelete!)) {
      deleteCommunitySubscription(subscriptionToDelete!.id);
    } else {
      let subscription: CommunitySubscriptionProps = {
        id: 0,
        user: user!,
        community: props
      }

      createCommunitySubscription(subscription);
    }
  }

  // eslint-disable-next-line no-restricted-globals
  location.reload();
}