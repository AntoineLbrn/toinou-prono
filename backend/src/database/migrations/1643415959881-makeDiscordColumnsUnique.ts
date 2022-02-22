import {MigrationInterface, QueryRunner} from "typeorm";

export class makeDiscordColumnsUnique1643415959881 implements MigrationInterface {
    name = 'makeDiscordColumnsUnique1643415959881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server" ADD CONSTRAINT "UQ_2bc809163d158be7bde8b2d0397" UNIQUE ("discordServerId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server" DROP CONSTRAINT "UQ_2bc809163d158be7bde8b2d0397"`);
    }

}
