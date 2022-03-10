import {MigrationInterface, QueryRunner} from "typeorm";

export class addValidVoteColumn1646784055180 implements MigrationInterface {
    name = 'addValidVoteColumn1646784055180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" ADD "valid" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP COLUMN "valid"`);
    }

}
