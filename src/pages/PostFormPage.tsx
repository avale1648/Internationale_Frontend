import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { PostForm } from "../components/post/PostForm";

export function PostFormPage({mode}:{mode:string}) {
    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="new"></Sidebar>
          <div className='content-container'>
              <PostForm mode={mode}></PostForm>
          </div>
        </div>
      </div>
    );
  }