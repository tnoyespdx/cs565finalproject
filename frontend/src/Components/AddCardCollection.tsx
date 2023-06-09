import { httpClient } from "@/Services/HttpClient.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export enum SubmissionStatus {
  NotSubmitted,
  SubmitFailed,
  SubmitSucceeded
}

export const AddCardCollection = () => {
  const { user } = useAuth0();
  const [userId, setUserId] = useState(0);
  const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);
  const [cardList, setCardList] = useState([]);
  
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
  
  
  function handleSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    
    httpClient.post("/collection/add",  {"user_id": userId, "card_id": +formJson.card_id}) //typecast to number
      .then( (response) => {
        if (response.status === 200) {
          setSubmitted(SubmissionStatus.SubmitSucceeded);
        }
      }).catch(err => {
        setSubmitted(SubmissionStatus.SubmitFailed);
        console.log("unable to add the card: ", err.message);
    });
  }
  
  useEffect( () => {
    const getAllCards = async () => {
      try {
        const theCards = await httpClient.get("/cards")
        return theCards.data;
      } catch (err) {
        console.log("unable to find any cards", err.message);
      }
    }
    getAllCards().then(setCardList);
  }, []);
  
  return (
    <form onSubmit={handleSubmit} className="mt-5">
    <label>
      <h1>Select a card to add to your collection:</h1>
      <br />
      <select name="card_id" defaultValue="Select a card">
        {
          cardList.map((card: {name:string, set:string, rarity:string, setNum:number, setTotal:number}, index) =>
            <option key={index} value={index+1}>{card.name} - {card.set} Set - {card.rarity} {card.setNum}/{card.setTotal}</option>)
          // The index starts at 0, but my cards card_id in the database start at 1
        }
      </select>
    </label>
      <br />
      <button type="submit" className="m-5 px-5">Add</button>
      {
        submitted === SubmissionStatus.SubmitFailed &&
        <div>
          <h3 className="text-danger mt-5">Unable to add card</h3>
          <h4 className="text-danger">Maybe you already have this one?</h4>
        </div>
      }
      {
        submitted === SubmissionStatus.SubmitSucceeded &&
        <h3 className="text-success mt-5">Card added!</h3>
      }
    </form>
  )
}
