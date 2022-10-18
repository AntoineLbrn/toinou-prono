import {MigrationInterface, QueryRunner} from "typeorm";

export class addPointsValueToMatches1666010156256 implements MigrationInterface {
    name = 'addPointsValueToMatches1666010156256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" ADD "pointsValue" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "pointsValue"`);
    }

}
