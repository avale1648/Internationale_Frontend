import PostProps from "./PostProps";
import UserProps from "./UserProps";

interface RatingProps {
    id: number;
    user: UserProps;
    post: PostProps;
    value: string;
}

export default RatingProps;