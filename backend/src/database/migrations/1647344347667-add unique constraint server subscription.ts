import {MigrationInterface, QueryRunner} from "typeorm";

export class addUniqueConstraintServerSubscription1647344347667 implements MigrationInterface {
    name = 'addUniqueConstraintServerSubscription1647344347667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ADD CONSTRAINT "server subscription" UNIQUE ("tournamentId", "serverId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" DROP CONSTRAINT "server subscription"`);
    }

}
