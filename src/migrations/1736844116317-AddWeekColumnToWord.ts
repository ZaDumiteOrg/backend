import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWeekColumnToWord1736844116317 implements MigrationInterface {
    name = 'AddWeekColumnToWord1736844116317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`word\` ADD \`week\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`insteadOf\` \`insteadOf\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`insteadOf\` \`insteadOf\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`word\` DROP COLUMN \`week\``);
    }

}
