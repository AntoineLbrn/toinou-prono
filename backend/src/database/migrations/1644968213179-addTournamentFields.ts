import {MigrationInterface, QueryRunner} from "typeorm";

export class addTournamentFields1644968213179 implements MigrationInterface {
    name = 'addTournamentFields1644968213179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ALTER COLUMN "autoPostBetsMinutes" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ALTER COLUMN "bettorRoleId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ALTER COLUMN "bettorRoleLabel" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ALTER COLUMN "bettorChannelId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ALTER COLUMN "bettorChannelLabel" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ALTER COLUMN "bettorChannelLabel" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ALTER COLUMN "bettorChannelId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ALTER COLUMN "bettorRoleLabel" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ALTER COLUMN "bettorRoleId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ALTER COLUMN "autoPostBetsMinutes" SET NOT NULL`);
    }

}
