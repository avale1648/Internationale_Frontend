import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { EditUserForm } from "../components/user/UserForms";

export function EditUserPage() {
    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="new"></Sidebar>
          <div className='content-container'>
              <EditUserForm></EditUserForm>
          </div>
        </div>
      </div>
    );
  }