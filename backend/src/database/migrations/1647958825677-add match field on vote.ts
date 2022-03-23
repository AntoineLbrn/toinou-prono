import {MigrationInterface, QueryRunner} from "typeorm";

export class addMatchFieldOnVote1647958825677 implements MigrationInterface {
    name = 'addMatchFieldOnVote1647958825677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" ADD "matchId" uuid`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_48e60e3188e3ef5117696dc3438" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_48e60e3188e3ef5117696dc3438"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP COLUMN "matchId"`);
    }

}
