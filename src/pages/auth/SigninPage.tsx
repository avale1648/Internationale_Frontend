import { SigninForm } from "../../components/user/UserForms";
import { Header } from "../../components/header/Header";
import { Sidebar } from "../../components/sidebar/Sidebar";

export function SigninPage() {
    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="profile"></Sidebar>
          <div className='content-container'>
              <SigninForm></SigninForm>
          </div>
        </div>
      </div>
    );
  }