import { useParams } from "react-router-dom";
import { getPosts } from "../api/PostService";
import PostProps from "../props/PostProps";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Post } from "../components/post/Post";

const posts: PostProps[] = await getPosts();

export function PostPage() {
  const { id } = useParams();
  const post = posts.find(p => p.id.toString() === id);

  localStorage.setItem("community_id", `${post!.id}`);
  localStorage.setItem("post_submit_mode", "post");

  return (
    <div>
      <Header></Header>
      <div className='main-container-1'>
        <Sidebar active="new"></Sidebar>
        <div className='content-container'>
          <div className='content-container-1'>
            <Post props={post as PostProps}></Post>
          </div>
        </div>
      </div>
    </div>
  );
}