import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { CardSeeder } from "./CardSeeder.js";
import { CollectedSeeder } from "./CollectedSeeder.js";
import { UserSeeder } from "./UserSeeder.js";
import { WantedSeeder } from "./WantedSeeder.js";

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {    return this.call(em, [
    UserSeeder,
    CardSeeder,
    CollectedSeeder,
    WantedSeeder
  ]);}

}
