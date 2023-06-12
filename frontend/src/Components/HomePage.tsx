import { httpClient } from "@/Services/HttpClient.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [exists, setExists] = useState(false);
  
  useEffect( () => {
    const checkIfUserExists = async () => {
      try {
        const theUser = await httpClient.search("/users", {"email": user.email})
        return (
          theUser !== null ? true : false
        )
      } catch (err) {
        console.log("Error checking if user exists: ", err);
      }
    }
    checkIfUserExists().then(setExists);
  }, [isAuthenticated]);
  
     useEffect( () =>{
      const createUserAccount = async () => {
        if (!exists) {
          try {
            httpClient.post("/users", {"email": user.email, "username": user.email})
              .then((response) => {
                console.log("response: ", response);
              })
          } catch (err) {
            console.log("Error creating a user account: ", err);
          }
        }
        
      }
      createUserAccount().then((res) => {console.log(res)});
    }, [exists]);
  
     return (
    <div>
      <h1 className={"mt-5"}>Pokemon Card Collector!</h1>
    </div>
  )

};
