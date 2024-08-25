import SignupForm from "../../components/auth/SignupForm";
import { Header } from "../../components/header/Header";
import { Sidebar } from "../../components/sidebar/Sidebar";

export function SignupPage() {
    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="users"></Sidebar>
          <div className='content-container'>
              <SignupForm></SignupForm>
          </div>
        </div>
      </div>
    );
  }