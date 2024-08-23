import { useParams } from "react-router-dom";
import { getCommunities } from "../api/CommunityService";
import CommunityProps from "../props/CommunityProps";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Community } from "../components/community/Community";

const communities: CommunityProps[] = await getCommunities();

export function CommunityPage() {
    const {name} = useParams();
    const community = communities.find(c => c.name === name);

    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="communities"></Sidebar>
          <div className='content-container'>
                <Community props={community as CommunityProps}/>
          </div>
        </div>
      </div>
    );
  }