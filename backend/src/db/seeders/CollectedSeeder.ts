import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Collected } from "../entities/Collected.js";

export class CollectedSeeder extends Seeder {
  
  async run(em: EntityManager): Promise<void> {
    em.create(Collected, {
      owner: 1,
      card: 1
    });
    em.create(Collected, {
      owner: 1,
      card: 2
    });
    em.create(Collected, {
      owner: 1,
      card: 3
    });
  }
}
