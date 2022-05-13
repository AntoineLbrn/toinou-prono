import {MigrationInterface, QueryRunner} from "typeorm";

export class AddExternalTournamentId1652194612674 implements MigrationInterface {
    name = 'AddExternalTournamentId1652194612674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tournament" ADD "externalTournamentId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "externalTournamentId"`);
    }

}
