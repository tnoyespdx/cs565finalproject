import { Migration } from '@mikro-orm/migrations';

export class Migration20230612215842_Added_card_properties extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "cards" add column "img_uri" varchar(255) not null, add column "rarity" varchar(255) not null, add column "set_num" int not null, add column "set_total" int not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cards" drop column "img_uri";');
    this.addSql('alter table "cards" drop column "rarity";');
    this.addSql('alter table "cards" drop column "set_num";');
    this.addSql('alter table "cards" drop column "set_total";');
  }

}
