import { useParams } from "react-router-dom";
import { getCommunities } from "../api/CommunityService";
import CommunityProps from "../props/CommunityProps";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Community } from "../components/community/Community";
import PostProps from "../props/PostProps";
import { getPosts } from "../api/PostService";
import { PostPreview } from "../components/post/Post";
import { CreateButton } from "../components/CreateButton";

const communities: CommunityProps[] = await getCommunities();
const posts: PostProps[] = await getPosts();

export function CommunityPage() {
    const {name} = useParams();
    const community = communities.find(c => c.name === name);
    const communityPosts = posts.filter(p => p.community?.name === community?.name);
    
    //localStorage.setItem("community_id", `${community!.id}`);
    localStorage.setItem("post_submit_mode", "community");

    let postCreator = <div></div>;

    if(localStorage.getItem("user_id") !== null && localStorage.getItem("user_id") !== "") {
      postCreator = <CreateButton url={`/posts/submit/communities/${community?.id}`} text="New post"></CreateButton>;
    }

    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="communities"></Sidebar>
          <div className='content-container'>
                <Community props={community as CommunityProps}/>
                {postCreator}
                <br />
                {communityPosts.map((post: PostProps) => <PostPreview props={post} key={post.id}></PostPreview>)}
          </div>
        </div>
      </div>
    );
  }