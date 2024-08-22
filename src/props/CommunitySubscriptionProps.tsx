import CommunityProps from "./CommunityProps";
import UserProps from "./UserProps";

interface CommunitySubscriptionProps {
    id: number;
    user: UserProps;
    community: CommunityProps;
}

export default CommunitySubscriptionProps;