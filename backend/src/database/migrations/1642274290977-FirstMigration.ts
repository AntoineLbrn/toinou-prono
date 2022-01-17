import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1642274290977 implements MigrationInterface {
    name = 'FirstMigration1642274290977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "discordUserId" character varying NOT NULL, "isSuperAdmin" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tournament_participation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shouldBeNotified" boolean NOT NULL, "participantId" uuid, "tournamentId" uuid, CONSTRAINT "PK_c9edef70a997aee232329a21fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tournament" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_449f912ba2b62be003f0c22e767" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "server_tournament_subscribtion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shouldAutoPostBets" boolean NOT NULL, "autoPostBetsHour" character varying NOT NULL, "autoPostBetsMinutes" character varying NOT NULL, "bettorRoleId" character varying NOT NULL, "bettorChannelId" character varying NOT NULL, "serverId" uuid, "tournamentId" uuid, CONSTRAINT "PK_d6954a01c85226e694343bd25c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "server" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "discordServerId" character varying NOT NULL, CONSTRAINT "PK_f8b8af38bdc23b447c0a57c7937" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_tournament_participation" ADD CONSTRAINT "FK_298e097c704c04598b6d4704e92" FOREIGN KEY ("participantId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tournament_participation" ADD CONSTRAINT "FK_bff531ebb1f50aa1b17c44649de" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ADD CONSTRAINT "FK_2123f4d582f211da392bba4ef6f" FOREIGN KEY ("serverId") REFERENCES "server"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" ADD CONSTRAINT "FK_8d92f896d550727388bc8ea2ee2" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" DROP CONSTRAINT "FK_8d92f896d550727388bc8ea2ee2"`);
        await queryRunner.query(`ALTER TABLE "server_tournament_subscribtion" DROP CONSTRAINT "FK_2123f4d582f211da392bba4ef6f"`);
        await queryRunner.query(`ALTER TABLE "user_tournament_participation" DROP CONSTRAINT "FK_bff531ebb1f50aa1b17c44649de"`);
        await queryRunner.query(`ALTER TABLE "user_tournament_participation" DROP CONSTRAINT "FK_298e097c704c04598b6d4704e92"`);
        await queryRunner.query(`DROP TABLE "server"`);
        await queryRunner.query(`DROP TABLE "server_tournament_subscribtion"`);
        await queryRunner.query(`DROP TABLE "tournament"`);
        await queryRunner.query(`DROP TABLE "user_tournament_participation"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
