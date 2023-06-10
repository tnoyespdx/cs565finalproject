// Cannot persist information otherwise, it will get rendered over!
import { CardService } from "@/Services/CardService.tsx";
import { httpClient } from "@/Services/HttpClient.tsx";
import { useEffect, useState } from "react";


export const Button = () => {
  const [clicks, setClicks] = useState(0);
  return (
    <button
      onClick={() => {
        console.log("Clicked");
        setClicks(clicks + 1);
      }}
    >
      Clicks: {clicks}
    </button>
  );
};

export const CollectionList = () => {
  const [collection, setCollection] = useState([]);
  const [cards, setCards] = useState([]);
  
  useEffect( () => {
    const getCollection = async () => {
      try {
        const collectionRes = await httpClient.search("/collection", {"user_id": 1});
        setCollection(collectionRes.data);
      } catch (err) {
        console.log("Error getting collection: ", err);
      }
      try {
        const cardsRes = await CardService.getCards();
        console.log(cardsRes.data);
        setCards(cardsRes.data);
      } catch (err) {
        console.log("Error getting cards: ", err);
      }
   
      
    };
    void getCollection();
  }, []);
  
 
  return (
    <div>
      <h2>Collection:</h2>
      {
        cards ?
          <ul>
            {
              cards.map((card: {name:string, set:string}, index) =>
              <li key={index}>Card: {card.name} - Set: {card.set}</li>)
            }
          </ul>
          :
          null
      }
      
    </div>
  );
};
