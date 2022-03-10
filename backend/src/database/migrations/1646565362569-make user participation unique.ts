import {MigrationInterface, QueryRunner} from "typeorm";

export class makeUserParticipationUnique1646565362569 implements MigrationInterface {
    name = 'makeUserParticipationUnique1646565362569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tournament_participation" ADD CONSTRAINT "user participation" UNIQUE ("tournamentId", "participantId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tournament_participation" DROP CONSTRAINT "user participation"`);
    }

}
