import {MigrationInterface, QueryRunner} from "typeorm";

export class removeLabelAndDescriptionFromVote1646672883620 implements MigrationInterface {
    name = 'removeLabelAndDescriptionFromVote1646672883620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP COLUMN "label"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vote" ADD "label" character varying NOT NULL`);
    }

}
