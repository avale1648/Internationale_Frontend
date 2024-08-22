import UserProps from "./UserProps";

interface CommunityProps {
    id: number;
    founder: UserProps;
    name: string;
    mature: boolean;
    rating: number;
    cakedate: string;
    description: string;
    pfp: string;
    banner: string;
}

export default CommunityProps;