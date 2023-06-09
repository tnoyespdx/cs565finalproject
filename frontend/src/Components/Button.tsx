// Cannot persist information otherwise, it will get rendered over!
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
  
  useEffect( () => {
    const getCollection = async () => {
      try {
        const collectionRes = await httpClient.search("/collection", {"user_id": 1});
        setCollection(collectionRes.data);
      } catch (err) {
        console.log("Error getting collection: ", err);
      }
      
    };
    void getCollection();
  }, []);
  
 
  return (
    <div>
      <h2>Collection:</h2>
      {
        collection ?
          <ul>
            {
              collection.map((collected: {card:number}, index) =>
              <li key={index}>Card: {collected.card}</li>)
            }
          </ul>
          :
          null
      }
      
    </div>
  );
};
