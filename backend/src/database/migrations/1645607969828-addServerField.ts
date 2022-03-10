import {MigrationInterface, QueryRunner} from "typeorm";

export class addServerField1645607969828 implements MigrationInterface {
    name = 'addServerField1645607969828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server" ADD "discordServerNameUsedToBe" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server" DROP COLUMN "discordServerNameUsedToBe"`);
    }

}
