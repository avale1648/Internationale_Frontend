import UserProps from '../../props/UserProps';
import './styles.css';
import RATING from '../../assets/rating.svg';
import REGISTRATION from '../../assets/registration.svg';
import { Link } from 'react-router-dom';

export function User({ props }: { props: UserProps }) {
    const date = new Date(props.cakedate);
    const cakedate_format = `${date.toLocaleDateString("ru-RU")}`;

    return (
        <div className='user'>
            <img className="user-banner" src={props.banner} alt='banner' />
            <div className='user-header'>
                <img src={props.pfp} alt='pfp' />
                <h2>{'с/' + props.name}</h2>
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
                <div className='user-description'>{props.description}</div>
            </div>
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

