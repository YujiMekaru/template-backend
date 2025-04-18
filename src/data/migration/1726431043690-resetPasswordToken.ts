import { MigrationInterface, QueryRunner } from 'typeorm';

export class ResetPasswordToken1726431043690 implements MigrationInterface {
    name = 'ResetPasswordToken1726431043690';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ADD "resetPasswordToken" character varying`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" DROP COLUMN "resetPasswordToken"`,
        );
    }
}
