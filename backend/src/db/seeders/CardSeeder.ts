import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Card} from "../entities/Card.js";

export class CardSeeder extends Seeder {
  
  async run(em: EntityManager): Promise<void> {
    em.create(Card, {
      name: "Bulbasaur",
      set: "Base",
      imgUri: "BulbasaurBaseSet44.jpg",
      rarity: "Common",
      setNum: 44,
      setTotal: 102
    });
    em.create(Card, {
      name: "Charmander",
      set: "Base",
      imgUri: "CharmanderBaseSet46.jpg",
      rarity: "Common",
      setNum: 46,
      setTotal: 102
    });
    em.create(Card, {
      name: "Squirtle",
      set: "Base",
      imgUri: "SquirtleBaseSet63.jpg",
      rarity: "Common",
      setNum: 63,
      setTotal: 102
    });
    em.create(Card, {
      name: "Ivysaur",
      set: "Base",
      imgUri: "IvysaurBaseSet30.jpg",
      rarity: "Uncommon",
      setNum: 30,
      setTotal: 102
    });
    em.create(Card, {
      name: "Charmeleon",
      set: "Base",
      imgUri: "CharmeleonBaseSet24.jpg",
      rarity: "Uncommon",
      setNum: 24,
      setTotal: 102
    });
    em.create(Card, {
      name: "Wartortle",
      set: "Base",
      imgUri: "WartortleBaseSet42.jpg",
      rarity: "Uncommon",
      setNum: 42,
      setTotal: 102
    });
    em.create(Card, {
      name: "Venusaur",
      set: "Base",
      imgUri: "VenusaurBaseSet15.jpg",
      rarity: "Holo Rare",
      setNum: 15,
      setTotal: 102
    });
    em.create(Card, {
      name: "Charizard",
      set: "Base",
      imgUri: "CharizardBaseSet4.jpg",
      rarity: "Uncommon",
      setNum: 4,
      setTotal: 102
    });
    em.create(Card, {
      name: "Blastoise",
      set: "Base",
      imgUri: "BlastoiseBaseSet2.jpg",
      rarity: "Uncommon",
      setNum: 2,
      setTotal: 102
    });
  }
}
