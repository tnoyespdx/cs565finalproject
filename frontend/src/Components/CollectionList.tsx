// Cannot persist information otherwise, it will get rendered over!
import { CardService } from "@/Services/CardService.tsx";
import { httpClient } from "@/Services/HttpClient.tsx";
import { useEffect, useState } from "react";

export const CollectionList = () => {
  const [collection, setCollection] = useState([]);
  const [usersCards, setUsersCards] = useState([]);
  const [cardNames, setCardNames] = useState([]);
  const [userId, setUserId] = useState(0);
  
  // useEffect( () => {
  //   const getUserId = async () => {
  //     try {
  //       const id = await httpClient.search("/users", {"email": user.email})
  //       console.log("id.data: ", id.data)
  //       return id.data;
  //
  //     } catch (err) {
  //       console.log("Error getting user id: ", err);
  //     }
  //   }
  //     getUserId().then(setUserId);
  // }, []);
  //
  // console.log("user id: ", userId);
  
  useEffect( () => {
    const getCollection = async () => {
      try {
        // Check which cards this user has in their collection
        const collectionRes = await httpClient.search("/collection", { "user_id": 1 });
        //const collectionRes = await httpClient.search("/collection", { "user_id": { userId } });

        return collectionRes.data;
      } catch (err) {
        console.log("Error getting collection: ", err);
      }
    }
      getCollection().then(setCollection);
    }, [userId]);
  
  
  useEffect( () => {
    // Build a new array that is just the card # of each card they own
    const cardIds = collection.map((collected: { card: number }) => collected.card)
    setUsersCards(cardIds);
  }, [collection]);
 
  
  useEffect( () => {
    // Use the card IDs to get the card names
    // Followed this blog: https://www.pluralsight.com/guides/asyncawait-keywords-with-array.map-in-react
    
    const doStuff = async () => {
      const getCardNames = async (card_id) => {
        const theData = await CardService.getACard(card_id);
        return theData.data;
      }
      const getAllCardNames = async () => {
        return await Promise.all(usersCards.map(getCardNames));
      }
      //setCardNames(output);
      return await getAllCardNames();
    }
    doStuff().then(setCardNames);
  }, [usersCards]);
  
  return (
    <div>
      {
        // collection ?
        //   <ul>
        //     {
        //
        //       // collection.map((collected: {card:number}, index) =>
        //       //   <li key={index}>Card ID: {collected.card}</li>)
        //       collection.map((collected: {card:number}) => (<div key={collected.card}>{collected.card}</div>))
        //     }
        //   </ul>
        //   :
        //   null
        
        cardNames ?
          <ul>
            {

              // collection.map((collected: {card:number}, index) =>
              //   <li key={index}>Card ID: {collected.card}</li>)
              cardNames.map((card: {name:string, set:string}, index) =>
                <li key={index}>{card.name} - {card.set} set</li>)
            }
          </ul>
          :
          null
      }
      
    </div>
  );
};
