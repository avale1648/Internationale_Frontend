import "./styles.css";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import CommunityProps from "../props/CommunityProps";
import { getCommunities } from "../api/CommunityService";
import { CommunityPreview } from "../components/community/Community";
import { CreateButton } from "../components/CreateButton";

const communities: CommunityProps[] = await getCommunities();

export function CommunitiesPage() {
  let communityCreator = <div></div>;

  if(localStorage.getItem("user_id") !== null && localStorage.getItem("user_id") !== "") {
    communityCreator = <CreateButton url="/communities/submit" text="New Community"></CreateButton>
  }
  
  return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="communities"></Sidebar>
          <div className='content-container'>
            {communityCreator} <br />
            {communities.map((community: CommunityProps) =>
                <CommunityPreview props={community} key={community.id}></CommunityPreview>)
            }
          </div>
        </div>
      </div>
    );
  }