import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  
  return (
    isAuthenticated && (
      <div>
        <span className={"px-5 align-middle"}>{user.email}</span>
      </div>
    )
  );
};

export default Profile;
