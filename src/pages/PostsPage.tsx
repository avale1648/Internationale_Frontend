import { getPosts } from "../api/PostService";
import { Header } from "../components/header/Header";
import { Post } from "../components/post/Post";
import { Sidebar } from "../components/sidebar/Sidebar";
import PostProps from "../props/PostProps";
import './styles.css';

const posts: PostProps[] = await getPosts();


export function PostsPage({sorting}:{sorting: string}) {
  const parentPosts = posts.filter(p => p.parentPost === null);

  if(sorting === 'new') {
    parentPosts.sort(compareByDate).reverse();
  }

  if(sorting === 'popular') {
    parentPosts.sort(compareByRating).reverse(); 
  }

  if(sorting === 'subscribed') {

  }

  return (
    <div>
      <Header></Header>
      <div className='main-container'>
        {sorting === 'new'? <Sidebar active="new"></Sidebar>: <Sidebar active="popular"></Sidebar>}
        <div className='content-container'>
          {parentPosts.map((post: PostProps) =>
              <Post props={post}></Post>)
          }
        </div>
      </div>
    </div>
  );
}

function compareByDate(a: PostProps, b: PostProps) {
  let result = 0;
  let aDate = Date.parse(a.postDate);
  let bDate = Date.parse(b.postDate);

  if(aDate < bDate) {
    result = -1;
  }
  if(aDate > bDate) {
    result = 1;
  }

  return result;
}

function compareByRating(a: PostProps, b: PostProps) {
  let result = 0;

  if(a.rating < b.rating) {
    result = -1;
  }
  if(a.rating > b.rating) {
    result = 1;
  }

  return result;
}