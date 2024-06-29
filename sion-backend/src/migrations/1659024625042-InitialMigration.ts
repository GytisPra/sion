import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1659024625042 implements MigrationInterface {
  name = 'InitialMigration1659024625042';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bid" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" double precision NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "auctionId" uuid, "userId" uuid, CONSTRAINT "PK_ed405dda320051aca2dcb1a50bb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "notification_type_enum" AS ENUM('AUCTION_HAS_ENDED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "notification_type_enum" NOT NULL, "isSeen" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2022-07-28T16:10:26.299Z"', "userId" uuid, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2022-07-28T16:10:26.303Z"', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2022-07-28T16:10:26.303Z"', "auctionId" uuid, "userId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public_file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying, "key" character varying NOT NULL, "data" bytea, CONSTRAINT "PK_bf2f5ba5aa6e3453b04cb4e4720" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying, "key" character varying NOT NULL, "data" bytea, "userId" uuid, CONSTRAINT "PK_4f776c999cfa0294c3c11876c71" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "user_roles_enum" AS ENUM('USER', 'MODERATOR', 'ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TYPE "user_level_enum" AS ENUM('Blocked', 'WatchList', 'Zero', 'One', 'Two', 'Three', 'Veteran', 'Elite')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying, "email" character varying NOT NULL, "firstname" character varying, "lastname" character varying, "password" character varying NOT NULL, "karmaPoints" double precision NOT NULL DEFAULT '10', "phone" character varying, "currentHashedRefreshToken" character varying, "roles" "user_roles_enum" array NOT NULL DEFAULT '{USER}', "level" "user_level_enum", "isVerified" boolean NOT NULL DEFAULT false, "isResetPasswordStarted" boolean NOT NULL DEFAULT false, "verificationSentAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "verifiedAt" TIMESTAMP WITH TIME ZONE, "provider" character varying, "providerId" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "item_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying, "key" character varying NOT NULL, "data" bytea, "itemId" uuid, CONSTRAINT "PK_6530fd4d0bbd05681b883bd63f2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "category_type_enum" AS ENUM('CATEGORY_GROUP', 'CATEGORY', 'SUBCATEGORY')`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "type" "category_type_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "parentCategoryId" uuid, CONSTRAINT "UQ_9f16dbbf263b0af0f03637fa7b5" UNIQUE ("title"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "brand" character varying NOT NULL, "categoryGroupId" uuid NOT NULL, "categoryId" uuid NOT NULL, "subcategoryId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "auction_auctiontype_enum" AS ENUM('BUY_NOW', 'AUTO_EXTEND', 'GRAND_AUCTION', 'MULTI_ITEM_LISTING')`,
    );
    await queryRunner.query(
      `CREATE TYPE "auction_auctionstatus_enum" AS ENUM('INACTIVE', 'ACTIVE', 'ENDED', 'HIDDEN', 'TERMINATED', 'PLANNED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "auction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "endDate" TIMESTAMP WITH TIME ZONE NOT NULL, "initialEndDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "auctionType" "auction_auctiontype_enum" array NOT NULL DEFAULT '{AUTO_EXTEND}', "auctionStatus" "auction_auctionstatus_enum" NOT NULL DEFAULT 'ACTIVE', "startingPrice" double precision NOT NULL DEFAULT '1', "buyNowPrice" double precision, "price" double precision NOT NULL, "bidIncrement" double precision NOT NULL, "grandAuctionStartPrice" double precision, "createdByUserId" uuid NOT NULL, "itemId" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "soldToUserId" uuid, CONSTRAINT "REL_040cf97924866445ed4248c631" UNIQUE ("itemId"), CONSTRAINT "PK_9dc876c629273e71646cf6dfa67" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ResetPasswordToken" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "token" character varying NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_48862b876e34d3f40ad143f5dff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "verification_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "code" character varying NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_74bc3066ea24f13f37d52a12c79" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category_closure" ("id_ancestor" uuid NOT NULL, "id_descendant" uuid NOT NULL, CONSTRAINT "PK_8da8666fc72217687e9b4f4c7e9" PRIMARY KEY ("id_ancestor", "id_descendant"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4aa1348fc4b7da9bef0fae8ff4" ON "category_closure" ("id_ancestor") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6a22002acac4976977b1efd114" ON "category_closure" ("id_descendant") `,
    );
    await queryRunner.query(
      `ALTER TABLE "bid" ADD CONSTRAINT "FK_2e00b0f268f93abcf693bb682c6" FOREIGN KEY ("auctionId") REFERENCES "auction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bid" ADD CONSTRAINT "FK_b0f254bd6d29d3da2b6a8af262b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_f9563e644405398330595c27905" FOREIGN KEY ("auctionId") REFERENCES "auction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_image" ADD CONSTRAINT "FK_bbbdf8daa06964389b3f90b9c2b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_image" ADD CONSTRAINT "FK_3ed970e86cadeae97bb52a8e44d" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43" FOREIGN KEY ("parentCategoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_f45b83cedc17fc8ac2f710b5cf3" FOREIGN KEY ("categoryGroupId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_c0c8f47a702c974a77812169bc2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_bd48da54281b181e4de3546b413" FOREIGN KEY ("subcategoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "auction" ADD CONSTRAINT "FK_58964aa6e47e70e7244c174d2bf" FOREIGN KEY ("soldToUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "auction" ADD CONSTRAINT "FK_d2e7d62d234c57d3a167d0db3f9" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "auction" ADD CONSTRAINT "FK_040cf97924866445ed4248c6319" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_closure" ADD CONSTRAINT "FK_4aa1348fc4b7da9bef0fae8ff48" FOREIGN KEY ("id_ancestor") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_closure" ADD CONSTRAINT "FK_6a22002acac4976977b1efd114a" FOREIGN KEY ("id_descendant") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category_closure" DROP CONSTRAINT "FK_6a22002acac4976977b1efd114a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_closure" DROP CONSTRAINT "FK_4aa1348fc4b7da9bef0fae8ff48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auction" DROP CONSTRAINT "FK_040cf97924866445ed4248c6319"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auction" DROP CONSTRAINT "FK_d2e7d62d234c57d3a167d0db3f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auction" DROP CONSTRAINT "FK_58964aa6e47e70e7244c174d2bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP CONSTRAINT "FK_bd48da54281b181e4de3546b413"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP CONSTRAINT "FK_c0c8f47a702c974a77812169bc2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP CONSTRAINT "FK_f45b83cedc17fc8ac2f710b5cf3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_9e5435ba76dbc1f1a0705d4db43"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_image" DROP CONSTRAINT "FK_3ed970e86cadeae97bb52a8e44d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_image" DROP CONSTRAINT "FK_bbbdf8daa06964389b3f90b9c2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_f9563e644405398330595c27905"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bid" DROP CONSTRAINT "FK_b0f254bd6d29d3da2b6a8af262b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bid" DROP CONSTRAINT "FK_2e00b0f268f93abcf693bb682c6"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_6a22002acac4976977b1efd114"`);
    await queryRunner.query(`DROP INDEX "IDX_4aa1348fc4b7da9bef0fae8ff4"`);
    await queryRunner.query(`DROP TABLE "category_closure"`);
    await queryRunner.query(`DROP TABLE "verification_token"`);
    await queryRunner.query(`DROP TABLE "ResetPasswordToken"`);
    await queryRunner.query(`DROP TABLE "auction"`);
    await queryRunner.query(`DROP TYPE "auction_auctionstatus_enum"`);
    await queryRunner.query(`DROP TYPE "auction_auctiontype_enum"`);
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TYPE "category_type_enum"`);
    await queryRunner.query(`DROP TABLE "item_image"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "user_level_enum"`);
    await queryRunner.query(`DROP TYPE "user_roles_enum"`);
    await queryRunner.query(`DROP TABLE "user_image"`);
    await queryRunner.query(`DROP TABLE "public_file"`);
    await queryRunner.query(`DROP TABLE "comment"`);
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TYPE "notification_type_enum"`);
    await queryRunner.query(`DROP TABLE "bid"`);
  }
}
