import {MigrationInterface, QueryRunner} from "typeorm";

export class ItemCreation1664636073694 implements MigrationInterface {
    name = 'ItemCreation1664636073694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."notification" ALTER COLUMN "createdAt" SET DEFAULT '"2022-10-01T14:54:36.268Z"'`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ALTER COLUMN "createdAt" SET DEFAULT '"2022-10-01T14:54:36.279Z"'`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ALTER COLUMN "updatedAt" SET DEFAULT '"2022-10-01T14:54:36.279Z"'`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "verificationSentAt"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "verificationSentAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "verifiedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "verifiedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "verifiedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "verifiedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "verificationSentAt"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "verificationSentAt" TIMESTAMP NOT NULL DEFAULT '2022-10-01 08:46:41.31'`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ALTER COLUMN "updatedAt" SET DEFAULT '2022-10-01 08:46:35.334+00'`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ALTER COLUMN "createdAt" SET DEFAULT '2022-10-01 08:46:35.334+00'`);
        await queryRunner.query(`ALTER TABLE "public"."notification" ALTER COLUMN "createdAt" SET DEFAULT '2022-10-01 08:46:35.344+00'`);
    }

}
