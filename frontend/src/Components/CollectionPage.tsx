import { CollectionList } from "@/Components/CollectionList.tsx";
import { httpClient } from "@/Services/HttpClient.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const CollectionPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [exists, setExists] = useState(false);
  
  
  useEffect( () => {
    function checkIfUserExists() {
      httpClient.search("/users", { "email": user.email })
        .then((response) => {
          if (response.status === 200) {
            console.log("welcome back ", user.email);
            setExists(true);
          }
        }).catch(err => {
        console.log("unable to find this user", err.message);
        window.location.replace("/signup");
      });
    }
    checkIfUserExists();
  }, []);
  
  return exists ?
    (
    <div>
      <h1 className={"mt-5"}>My Collection</h1>
      <Link to={"/collection/add"}>Add a Card</Link>
      <CollectionList />
    </div>
    )
    :
    null
};
