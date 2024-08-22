import CommunityProps from "../../props/CommunityProps";
import DEFAULT_BANNER from '../../assets/default_banner.png';
import DEFAULT_PFP from '../../assets/default-community-pfp.png';
import RATING from '../../assets/rating.svg';
import REGISTRATION from '../../assets/registration.svg';
import MATURE from '../../assets/mature.svg';
import UNMATURE from '../../assets/unmature.svg';
import FOUNDER from '../../assets/user.svg';
import './styles.css';

export function Community({props}:{props: CommunityProps}) {
    const banner = props.banner === "" || props.banner === null ? DEFAULT_BANNER : props.banner;
    const pfp = props.pfp === "" || props.pfp === null ? DEFAULT_PFP : props.pfp;
    const date = new Date(props.cakedate);
    const cakedate_format = `${date.toLocaleDateString("ru-RU")}`;
    const mature = props.mature === true? MATURE: UNMATURE;
    

    return (<div className='community'>
        <img className='community-banner' src={banner} alt='banner'></img>
        <div className='community-header'>
          <img src={pfp} alt='pfp'></img>
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