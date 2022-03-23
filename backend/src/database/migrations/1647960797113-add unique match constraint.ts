import {MigrationInterface, QueryRunner} from "typeorm";

export class addUniqueMatchConstraint1647960797113 implements MigrationInterface {
    name = 'addUniqueMatchConstraint1647960797113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "user vote"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "user can vote one per match" UNIQUE ("participationId", "matchId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "user can vote one per match"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "user vote" UNIQUE ("betId", "participationId")`);
    }

}
