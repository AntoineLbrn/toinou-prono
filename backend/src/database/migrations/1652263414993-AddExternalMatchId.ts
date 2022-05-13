import {MigrationInterface, QueryRunner} from "typeorm";

export class AddExternalMatchId1652263414993 implements MigrationInterface {
    name = 'AddExternalMatchId1652263414993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" ADD "externalMatchId" character varying`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "UQ_e04ebc1a22c61d959e41ee080c3" UNIQUE ("externalMatchId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "UQ_e04ebc1a22c61d959e41ee080c3"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "externalMatchId"`);
    }

}
