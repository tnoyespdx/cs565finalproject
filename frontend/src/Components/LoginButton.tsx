import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  
  
  return (
  isAuthenticated ?
    <button className={"px-3"} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
    :
    <button className={"px-3"} onClick={() => loginWithRedirect()}>Log In</button>
  )

};

export default LoginButton;
