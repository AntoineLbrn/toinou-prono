import {MigrationInterface, QueryRunner} from "typeorm";

export class makeDiscordColumnsUnique1643415809233 implements MigrationInterface {
    name = 'makeDiscordColumnsUnique1643415809233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_eab11953198745b2e03be12ee56" UNIQUE ("discordUserId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_eab11953198745b2e03be12ee56"`);
    }

}
