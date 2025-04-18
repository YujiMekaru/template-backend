import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1726429126605 implements MigrationInterface {
    name = 'FirstMigration1726429126605';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "cpf" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "profilePictureUrl" character varying, "role" character varying NOT NULL DEFAULT 'user', "emailConfirmed" boolean NOT NULL DEFAULT false, "confirmationToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
