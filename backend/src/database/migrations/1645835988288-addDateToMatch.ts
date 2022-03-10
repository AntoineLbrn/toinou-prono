import {MigrationInterface, QueryRunner} from "typeorm";

export class addDateToMatch1645835988288 implements MigrationInterface {
    name = 'addDateToMatch1645835988288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" ADD "date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "date"`);
    }

}
