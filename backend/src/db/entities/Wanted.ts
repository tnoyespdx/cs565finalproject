import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Card } from "./Card.js";
import { User } from "./User.js";

@Entity({ tableName: "wanted"})
export class Wanted {
  // The user who owns this collection
  @ManyToOne({ primary: true })
  owner!: User;
  
  // The card in the user's collection
  @ManyToOne({ primary: true })
  card!: Card;
  
  @Property()
  created_at = new Date();
}
