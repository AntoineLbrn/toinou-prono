import {MigrationInterface, QueryRunner} from "typeorm";

export class addTagToUser1642900772440 implements MigrationInterface {
    name = 'addTagToUser1642900772440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "tagUsedToBe" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tagUsedToBe"`);
    }

}
