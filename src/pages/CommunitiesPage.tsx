import "./styles.css";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import CommunityProps from "../props/CommunityProps";
import { getCommunities } from "../api/CommunityService";
import { CommunityPreview } from "../components/community/Community";

const communities: CommunityProps[] = await getCommunities();

export function CommunitiesPage() {
    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="communities"></Sidebar>
          <div className='content-container'>
            {communities.map((community: CommunityProps) =>
                <CommunityPreview props={community}></CommunityPreview>)
            }
          </div>
        </div>
      </div>
    );
  }