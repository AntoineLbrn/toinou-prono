import {MigrationInterface, QueryRunner} from "typeorm";

export class makeVotesManuallyClosable1646609822371 implements MigrationInterface {
    name = 'makeVotesManuallyClosable1646609822371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" RENAME COLUMN "manualVoteCosing" TO "manualVoteClosing"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" RENAME COLUMN "manualVoteClosing" TO "manualVoteCosing"`);
    }

}
