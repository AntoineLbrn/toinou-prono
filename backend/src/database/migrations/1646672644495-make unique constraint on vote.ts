import {MigrationInterface, QueryRunner} from "typeorm";

export class makeUniqueConstraintOnVote1646672644495 implements MigrationInterface {
    name = 'makeUniqueConstraintOnVote1646672644495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "user vote" UNIQUE ("participationId", "betId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "user vote"`);
    }

}
