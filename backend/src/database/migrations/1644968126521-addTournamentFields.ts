import {MigrationInterface, QueryRunner} from "typeorm";

export class addTournamentFields1644968126521 implements MigrationInterface {
    name = 'addTournamentFields1644968126521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ALTER COLUMN "shouldAutoPostBets" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ALTER COLUMN "autoPostBetsHour" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ALTER COLUMN "autoPostBetsHour" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ALTER COLUMN "shouldAutoPostBets" DROP DEFAULT`);
    }

}
