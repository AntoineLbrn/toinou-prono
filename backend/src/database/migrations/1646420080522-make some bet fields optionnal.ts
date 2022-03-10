import {MigrationInterface, QueryRunner} from "typeorm";

export class makeSomeBetFieldsOptionnal1646420080522 implements MigrationInterface {
    name = 'makeSomeBetFieldsOptionnal1646420080522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bet" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bet" ALTER COLUMN "description" SET NOT NULL`);
    }

}
