import LoginButton from "@/Components/LoginButton.tsx";
import LogoutButton from "@/Components/LogoutButton.tsx";
import Profile from "@/Components/Profile.tsx";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <div>
      <nav>
        <div className={"menu"}>
          <Link to={"/"}>Home</Link>
          <Link to={"/collection"}>My Collection</Link>
        </div>
      </nav>
      <LoginButton />
      <Profile />
    </div>
  );
};
