import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1721847038095 implements MigrationInterface {
    name = 'Migrations1721847038095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cards" ("cardNumber" character varying NOT NULL, "cardName" character varying NOT NULL, "expirationDate" character varying NOT NULL, "cvv" character varying NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_c3c9b9ffb9dcd3a091df3ee08c1" UNIQUE ("cardNumber"), CONSTRAINT "UQ_9bf12549174a367c6dca4365894" UNIQUE ("cardName"), CONSTRAINT "PK_c3c9b9ffb9dcd3a091df3ee08c1" PRIMARY KEY ("cardNumber"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cards"`);
    }

}
