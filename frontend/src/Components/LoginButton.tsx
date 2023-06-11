import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  
  return (
  isAuthenticated ?
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
    :
    <button onClick={() => loginWithRedirect()}>Log In</button>
  )

};

export default LoginButton;
