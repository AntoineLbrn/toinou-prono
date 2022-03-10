import {MigrationInterface, QueryRunner} from "typeorm";

export class addPointsColumn1646783565591 implements MigrationInterface {
    name = 'addPointsColumn1646783565591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tournament_participation" ADD "points" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tournament_participation" DROP COLUMN "points"`);
    }

}
