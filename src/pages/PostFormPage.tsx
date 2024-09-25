import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { PostSubmitForm, PostEditForm } from "../components/post/PostForms";
import { useParams } from "react-router-dom";


//создать пост на странице пользователя
export function PostFormPageUser() {
    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="new"></Sidebar>
          <div className='content-container'>
              <PostSubmitForm submitOn="" submitOnId=""></PostSubmitForm>
          </div>
        </div>
      </div>
    );
  }

  //создать пост в сообществе
  export function PostFormPageCommunity() {
    const {id} = useParams();
    
    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="new"></Sidebar>
          <div className='content-container'>
              <PostSubmitForm submitOn="community" submitOnId={id!}></PostSubmitForm>
          </div>
        </div>
      </div>
    );
  }

  export function PostFormPageEdit() {
    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="new"></Sidebar>
          <div className='content-container'>
              <PostEditForm></PostEditForm>
          </div>
        </div>
      </div>
    );
  }