import { Migration } from '@mikro-orm/migrations';

export class Migration20230613232010_added_wanted_entity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "wanted" ("owner_id" int not null, "card_id" int not null, "created_at" timestamptz(0) not null, constraint "wanted_pkey" primary key ("owner_id", "card_id"));');

    this.addSql('alter table "wanted" add constraint "wanted_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "wanted" add constraint "wanted_card_id_foreign" foreign key ("card_id") references "cards" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "wanted" cascade;');
  }

}
