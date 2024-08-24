import { useParams } from "react-router-dom";
import { getCommunities } from "../api/CommunityService";
import CommunityProps from "../props/CommunityProps";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Community } from "../components/community/Community";
import PostProps from "../props/PostProps";
import { getPosts } from "../api/PostService";
import { Post } from "../components/post/Post";

const communities: CommunityProps[] = await getCommunities();
const posts: PostProps[] = await getPosts();

export function CommunityPage() {
    const {name} = useParams();
    const community = communities.find(c => c.name === name);
    const communityPosts = posts.filter(p => p.community?.name === community?.name)

    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="communities"></Sidebar>
          <div className='content-container'>
                <Community props={community as CommunityProps}/>
                {communityPosts.map((post: PostProps) => <Post props={post}></Post>)}
          </div>
        </div>
      </div>
    );
  }