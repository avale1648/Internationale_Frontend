import { useParams } from "react-router-dom";
import { getPosts } from "../api/PostService";
import PostProps from "../props/PostProps";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Post } from "../components/post/Post";

const posts: PostProps[] = await getPosts();

export function PostPage() {
    const {id} = useParams();
    const post = posts.find(p => p.id.toString() === id);
    
    return (
        <div>
          <Header></Header>
          <div className='main-container'>
            <Sidebar active="new"></Sidebar>
            <div className='content-container'>
                  <Post props={post as PostProps}></Post>
            </div>
          </div>
        </div>
      );
}