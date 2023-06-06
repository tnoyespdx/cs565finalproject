import { Migration } from '@mikro-orm/migrations';

export class Migration20230606071621_add_collections extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "collected" ("owner_id" int not null, "card_id" int not null, "created_at" timestamptz(0) not null, constraint "collected_pkey" primary key ("owner_id", "card_id"));');

    this.addSql('alter table "collected" add constraint "collected_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "collected" add constraint "collected_card_id_foreign" foreign key ("card_id") references "cards" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "collected" cascade;');
  }

}
