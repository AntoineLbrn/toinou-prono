import {MigrationInterface, QueryRunner} from "typeorm";

export class addCascadeOnBetWhenDeleteMatch1648644798798 implements MigrationInterface {
    name = 'addCascadeOnBetWhenDeleteMatch1648644798798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bet" DROP CONSTRAINT "FK_20e06ada2739d538caaa66ea457"`);
        await queryRunner.query(`ALTER TABLE "bet" ADD CONSTRAINT "FK_20e06ada2739d538caaa66ea457" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bet" DROP CONSTRAINT "FK_20e06ada2739d538caaa66ea457"`);
        await queryRunner.query(`ALTER TABLE "bet" ADD CONSTRAINT "FK_20e06ada2739d538caaa66ea457" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
