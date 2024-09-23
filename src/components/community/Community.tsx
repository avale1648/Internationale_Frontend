import CommunityProps from "../../props/CommunityProps";
import RATING from '../../assets/rating.svg';
import REGISTRATION from '../../assets/registration.svg';
import MATURE from '../../assets/mature.svg';
import UNMATURE from '../../assets/unmature.svg';
import FOUNDER from '../../assets/user.svg';
import './styles.css';
import { Link } from "react-router-dom";

export function Community({props}:{props: CommunityProps}) {
    const date = new Date(props.cakedate);
    const cakedate_format = `${date.toLocaleDateString("ru-RU")}`;
    const mature = props.mature === true? MATURE: UNMATURE;
    

    return (<div className='community'>
        <img className='community-banner' src={props.banner} alt='banner'></img>
        <div className='community-header'>
          <img src={props.pfp} alt='pfp'></img>
          <h2>{'i/' + props.name}</h2>
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

export function CommunityPreview({props}:{props: CommunityProps}) {
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