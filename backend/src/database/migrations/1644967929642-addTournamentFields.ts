import {MigrationInterface, QueryRunner} from "typeorm";

export class addTournamentFields1644967929642 implements MigrationInterface {
    name = 'addTournamentFields1644967929642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ADD "bettorRoleLabel" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ADD "bettorChannelLabel" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" DROP COLUMN "bettorChannelLabel"`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" DROP COLUMN "bettorRoleLabel"`);
    }

}
