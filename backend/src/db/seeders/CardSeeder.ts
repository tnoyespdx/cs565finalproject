import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Card} from "../entities/Card.js";

export class CardSeeder extends Seeder {
  
  async run(em: EntityManager): Promise<void> {
    em.create(Card, {
      name: "Bulbasaur",
      set: "Base"
    });
    em.create(Card, {
      name: "Charmander",
      set: "Base"
    });
    em.create(Card, {
      name: "Squirtle",
      set: "Base"
    });
  }
}
