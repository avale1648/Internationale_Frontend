import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { CommunityForm } from "../components/community/CommunityForm";
import "./styles.css";

export function SubmitCommunityPage() {
    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="new"></Sidebar>
          <div className='content-container'>
              <CommunityForm></CommunityForm>
          </div>
        </div>
      </div>
    );
  }