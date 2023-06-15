import { CardService } from "@/Services/CardService.tsx";
import { httpClient } from "@/Services/HttpClient.tsx";
import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Card, CardGroup} from 'react-bootstrap';

export const CollectionList = () => {
  const [collection, setCollection] = useState([]);
  const [usersCards, setUsersCards] = useState([]);
  const [cardNames, setCardNames] = useState([]);
  const [userId, setUserId] = useState(0);
  
  const { user, isAuthenticated } = useAuth0();
  
  
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
  }, [isAuthenticated]);
  
  useEffect( () => {
    const getCollection = async () => {
      try {
        // Check which cards this user has in their collection
        const collectionRes = await httpClient.search("/collection", { "user_id": userId });
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
      return await getAllCardNames();
    }
    doStuff().then(setCardNames);
  }, [usersCards]);
  
  
  if (usersCards.length === 0) {
    return (
      <div>
        <h3 className={"m-5"}>You don't have any cards yet!</h3>
        <img src={"./images/surprised_pikachu.jpg"} alt={"pikachu"}/>
      </div>
    )
  }
  
  return (
    <div>
      {
        cardNames ?
          <ul>
            <CardGroup className={"mt-5"}>
            {
              cardNames.map((card: {name:string, set:string, imgUri:string, rarity:string, setNum:number, setTotal:number}, index) =>
                <li className={"list-unstyled"} key={index}>
              
                  <Card className={"m-1"} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={"./images/" + card.imgUri} />
                <Card.Body>
                  <Card.Title>{card.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{card.set} Set</Card.Subtitle>
                  <Card.Text>
                    {card.rarity} - {card.setNum}/{card.setTotal}
                  </Card.Text>
                </Card.Body>
              </Card>
                </li>)
            }
          </CardGroup>
          </ul>
          :
          null
      }
    </div>
  );
};
