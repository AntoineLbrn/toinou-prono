import {MigrationInterface, QueryRunner} from "typeorm";

export class makeVotesManuallyClosable1646608946156 implements MigrationInterface {
    name = 'makeVotesManuallyClosable1646608946156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" ADD "manualVoteCosing" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "manualVoteCosing"`);
    }

}
