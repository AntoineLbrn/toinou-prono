import {MigrationInterface, QueryRunner} from "typeorm";

export class addTournamentFields1643928447419 implements MigrationInterface {
    name = 'addTournamentFields1643928447419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tournament" ADD "label" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tournament" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "label"`);
    }

}
