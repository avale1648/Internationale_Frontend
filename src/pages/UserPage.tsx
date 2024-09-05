import { useParams } from "react-router-dom";
import { getUsers } from "../api/UserService";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { User } from "../components/user/User";
import UserProps from "../props/UserProps";
import PostProps from "../props/PostProps";
import { getPosts } from "../api/PostService";
import { Post } from "../components/post/Post";
import { CreateButton } from "../components/CreateButton";

const users: UserProps[] = await getUsers();
const posts: PostProps[] = await getPosts();

export function UserPage() {
  const { name } = useParams();
  const user = users.find(u => u.name === name);
  const userPosts = posts.filter(p => p.user.name === user?.name);
  const isUserMe: boolean = user?.id === Number(localStorage.getItem("user_id"))? true: false; 

  let postCreator = <div></div>;

  if(isUserMe) {
    localStorage.setItem("post_submit_mode", "user")
    postCreator = <CreateButton url='/posts/submit' text="New post"></CreateButton>;
  }

  return (
    <div>
      <Header></Header>
      <div className='main-container'>
        <Sidebar active={isUserMe ? "profile" : "users"}></Sidebar>
        <div className='content-container'>
          <User props={user as UserProps} />
          {postCreator} <br />
          {userPosts.map((post: PostProps) => <Post props={post} key={post.id}></Post>)}
        </div>
      </div>
    </div>
  );
}