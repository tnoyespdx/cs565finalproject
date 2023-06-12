import { AddCard } from "@/Components/AddCard.tsx";
import { CollectionList } from "@/Components/CollectionList.tsx";
import { Link } from "react-router-dom";

export const CollectionPage = () => {
  return (
    <div>
      <h1 className={"mt-5"}>My Collection</h1>
      <Link to={"/collection/add"}>Add a Card</Link>
      <CollectionList />
    </div>
  );
};
