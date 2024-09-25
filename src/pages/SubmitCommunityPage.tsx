import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { CommunityEditForm, CommunitySubmitForm } from "../components/community/CommunityForms";
import "./styles.css";

export function SubmitCommunityPage() {
    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="new"></Sidebar>
          <div className='content-container'>
              <CommunitySubmitForm></CommunitySubmitForm>
          </div>
        </div>
      </div>
    );
}

export function EditCommunityPage() {
  return (
    <div>
      <Header></Header>
      <div className='main-container'>
        <Sidebar active="new"></Sidebar>
        <div className='content-container'>
            <CommunityEditForm></CommunityEditForm>
        </div>
      </div>
    </div>
  );
}