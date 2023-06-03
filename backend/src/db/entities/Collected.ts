import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Card } from "./Card.js";
import { User } from "./User.js";

@Entity({ tableName: "collected"})
export class Collected {
  // The user who owns this collection
  @ManyToOne({ primary: true })
  owner!: User;
  
  // The card in the user's collection
  @ManyToOne({ primary: true })
  card!: Card;
  
  @Property()
  created_at = new Date();
}
