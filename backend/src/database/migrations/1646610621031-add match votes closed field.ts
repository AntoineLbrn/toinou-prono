import {MigrationInterface, QueryRunner} from "typeorm";

export class addMatchVotesClosedField1646610621031 implements MigrationInterface {
    name = 'addMatchVotesClosedField1646610621031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" ADD "isVoteClosed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "isVoteClosed"`);
    }

}
