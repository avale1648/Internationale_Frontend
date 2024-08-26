import { SignupForm } from "@userfront/toolkit";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { PostForm } from "../components/post/PostForm";

export function SubmitPostPage() {
    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="new"></Sidebar>
          <div className='content-container'>
              <PostForm></PostForm>
          </div>
        </div>
      </div>
    );
  }