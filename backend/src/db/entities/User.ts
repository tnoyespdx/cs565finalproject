import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { Enum } from "@mikro-orm/core";
import { MyBaseEntity } from "./MyBaseEntity.js";

export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User'
}

@Entity({ tableName: "users"})
export class User extends MyBaseEntity {
  @Property()
  @Unique()
  email!: string;
  
  @Property()
  username!: string
  
  @Enum(() => UserRole)
  role!: UserRole; // string enum
}
