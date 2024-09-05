import { getUsers } from "../api/UserService";
import { Header } from "../components/header/Header";
import { UserPreview } from "../components/user/User";
import { Sidebar } from "../components/sidebar/Sidebar";
import './styles.css';
import UserProps from "../props/UserProps";

const users: UserProps[] = await getUsers();

export function UsersPage() {

  return (
    <div>
      <Header></Header>
      <div className='main-container'>
        <Sidebar active="users"></Sidebar>
        <div className='content-container'>
          {users.map((user: UserProps) =>
              <UserPreview userProps={user} key={user.id}></UserPreview>)
          }
        </div>
      </div>
    </div>
  );
}