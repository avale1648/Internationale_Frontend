import { useParams } from "react-router-dom";
import { getUsers } from "../api/UserService";
import { Header } from "../components/header/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { User } from "../components/user/User";
import UserProps from "../props/UserProps";

const users: UserProps[] = await getUsers();

export function UserPage() {
    const {name} = useParams();
    const user = users.find(u => u.name === name);

    return (
      <div>
        <Header></Header>
        <div className='main-container'>
          <Sidebar active="users"></Sidebar>
          <div className='content-container'>
                <User userProps={user as UserProps}/>
          </div>
        </div>
      </div>
    );
  }