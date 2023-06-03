import { Migration } from '@mikro-orm/migrations';

export class Migration20230603071122_name_to_username extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" rename column "name" to "username";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" rename column "username" to "name";');
  }

}
