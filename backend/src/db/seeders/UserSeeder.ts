import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User, UserRole } from "../entities/User.js";

export class UserSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    em.create(User, {
      name: "Travis Noyes",
      email: "tnoyes@pdx.edu",
      role: UserRole.ADMIN,
    });
  }
}
