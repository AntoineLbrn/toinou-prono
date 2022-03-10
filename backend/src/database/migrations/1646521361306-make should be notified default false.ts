import {MigrationInterface, QueryRunner} from "typeorm";

export class makeShouldBeNotifiedDefaultFalse1646521361306 implements MigrationInterface {
    name = 'makeShouldBeNotifiedDefaultFalse1646521361306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tournament_participation" ALTER COLUMN "shouldBeNotified" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tournament_participation" ALTER COLUMN "shouldBeNotified" DROP DEFAULT`);
    }

}
