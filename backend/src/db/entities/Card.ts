import { Entity, Property} from "@mikro-orm/core";
import { MyBaseEntity } from "./MyBaseEntity.js";


@Entity({ tableName: "cards"})
export class Card extends MyBaseEntity {
  @Property()
  name!: string;
  
  @Property()
  set!: string;
  
  @Property()
  imgUri!: string;
  
  @Property()
  rarity!: string;
  
  @Property()
  setNum!: number;
  
  @Property()
  setTotal!: number;
}
