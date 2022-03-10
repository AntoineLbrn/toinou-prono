import {MigrationInterface, QueryRunner} from "typeorm";

export class changeVoteEntity1646657073099 implements MigrationInterface {
    name = 'changeVoteEntity1646657073099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_f5de237a438d298031d11a57c3b"`);
        await queryRunner.query(`ALTER TABLE "vote" RENAME COLUMN "userId" TO "participationId"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_ad72c0c12820d33cb5f7c53bb2e" FOREIGN KEY ("participationId") REFERENCES "user_tournament_participation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_ad72c0c12820d33cb5f7c53bb2e"`);
        await queryRunner.query(`ALTER TABLE "vote" RENAME COLUMN "participationId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_f5de237a438d298031d11a57c3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
