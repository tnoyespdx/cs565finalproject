import { Migration } from '@mikro-orm/migrations';

export class Migration20230603193704_add_cards extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "cards" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "set" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "cards" cascade;');
  }

}
