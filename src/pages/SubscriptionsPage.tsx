import { getUserById, getUsers } from "../api/UserService";
import { Header } from "../components/header/Header";
import { UserPreview } from "../components/user/User";
import { Sidebar } from "../components/sidebar/Sidebar";
import './styles.css';
import UserProps from "../props/UserProps";
import { getUserSubscriptions } from "../api/UserSubscriptionService";
import UserSubscriptionProps from "../props/UserSubscriptionProps";
import CommunitySubscriptionProps from "../props/CommunitySubscriptionProps";
import { getCommunitySubscriptions } from "../api/CommunitySubscriptionServise";
import PostProps from "../props/PostProps";
import { getPosts } from "../api/PostService";
import { PostPreview } from "../components/post/Post";
import { getCommunities } from "../api/CommunityService";
import CommunityProps from "../props/CommunityProps";
import { CommunityPreview } from "../components/community/Community";

const userId: number = Number(localStorage.getItem("user_id"));
const user: UserProps | undefined = localStorage.getItem("user_id") === null ? undefined : await getUserById(userId);
const userSubscriptions: UserSubscriptionProps[] = await getUserSubscriptions();
const communitySubscriptions: CommunitySubscriptionProps[] = await getCommunitySubscriptions();
const users: UserProps[] = await getUsers();
const communities: CommunityProps[] = await getCommunities();

export function SubscriptionsPage() {
    let subsOnUsers: UserProps[] = [];
    let subsOnCommunities: CommunityProps[] = [];
    
        userSubscriptions.forEach(us => {
            subsOnUsers.push(users.find(u => u.id === us.author.id)!);
        })

        communitySubscriptions.forEach(cs => {
            subsOnCommunities.push(communities.find(c => c.id === cs.community.id)!);
        })

    return (
        <div>
            <Header></Header>
            <div className='main-container'>
                <Sidebar active="subscriptions"></Sidebar>
                <div className='content-container'>
                    {subsOnUsers.map((u) =>
                        <UserPreview userProps={u} key={u.id}></UserPreview>)
                    }

                    {subsOnCommunities.map((c) =>
                        <CommunityPreview props={c} key={c.id}></CommunityPreview>)
                    }
                </div>
            </div>
        </div>
    );
}