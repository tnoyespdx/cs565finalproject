import { AddCardService } from "@/Services/AddCardService.tsx";
import { httpClient } from "@/Services/HttpClient.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const AddCard = () => {
  const { user } = useAuth0();
  const [userId, setUserId] = useState(0);
  
  
  useEffect( () => {
    const getUserId = async () => {
      try {
        // Query the database using the authenticated user's email, and get back their user id
        const theUser = await httpClient.search("/users", {"email": user.email})
        return theUser.data.id;
      } catch (err) {
        console.log("Error getting user id: ", err);
      }
    }
    getUserId().then(setUserId);
  }, []);
  
  const onAddButtonClick = () => {
    AddCardService.add(userId, 5)
      .catch((err) => {
      console.error(err);
  });
  }
  
  
  return (
    <div>
        <label>Add a card:</label>
          <select>
            <option value={1}>Charizard</option>
          </select>
      <br />
     <button onClick={onAddButtonClick}>Add</button>
    </div>
  )
}
