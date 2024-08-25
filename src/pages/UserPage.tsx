import { Navigate, useParams } from "react-router-dom";
import { getUsers } from "../api/UserService";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { User } from "../components/user/User";
import UserProps from "../props/UserProps";
import PostProps from "../props/PostProps";
import { getPosts } from "../api/PostService";
import { Post } from "../components/post/Post";

const users: UserProps[] = await getUsers();
const posts: PostProps[] = await getPosts();

export function UserPage() {
  const { name } = useParams();
  const user = users.find(u => u.name === name);
  const userPosts = posts.filter(p => p.user.name === user?.name);
  const user_me: UserProps = JSON.parse(localStorage.getItem("user")!);

  if(user_me === null) {
      return <Navigate to='/signin'></Navigate>
  }

  return (
    <div>
      <Header></Header>
      <div className='main-container'>
        <Sidebar active={user!.name === user_me!.name ? "profile" : "users"}></Sidebar>
        <div className='content-container'>
          <User userProps={user as UserProps} />
          {userPosts.map((post: PostProps) => <Post props={post}></Post>)}
        </div>
      </div>
    </div>
  );
}