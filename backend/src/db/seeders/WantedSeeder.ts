import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Wanted } from "../entities/Wanted.js";

export class WantedSeeder extends Seeder {
  
  async run(em: EntityManager): Promise<void> {
    em.create(Wanted, {
      owner: 1,
      card: 4
    });
    em.create(Wanted, {
      owner: 1,
      card: 5
    });
    em.create(Wanted, {
      owner: 1,
      card: 6
    });
  }
}
