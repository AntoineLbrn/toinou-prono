import {MigrationInterface, QueryRunner} from "typeorm";

export class makeSomeMatchFieldsOptionnal1645980323784 implements MigrationInterface {
    name = 'makeSomeMatchFieldsOptionnal1645980323784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "match" ALTER COLUMN "discordMessageId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" ALTER COLUMN "discordMessageId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "match" ALTER COLUMN "description" SET NOT NULL`);
    }

}
