import CommunityProps from "./CommunityProps";
import UserProps from "./UserProps";

interface ModeratorProps {
    id: number;
    user: UserProps;
    community: CommunityProps;
}

export default ModeratorProps;