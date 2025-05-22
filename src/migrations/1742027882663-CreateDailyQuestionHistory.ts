import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDailyQuestionHistory1742027882663 implements MigrationInterface {
    name = 'CreateDailyQuestionHistory1742027882663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`daily_question_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dayOfWeek\` int NOT NULL, \`assignedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`questionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`insteadOf\` \`insteadOf\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`week\` \`week\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`optionC\` \`optionC\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`optionD\` \`optionD\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_question\` DROP FOREIGN KEY \`FK_64b66c10122a98bb8faaed64857\``);
        await queryRunner.query(`ALTER TABLE \`user_question\` DROP FOREIGN KEY \`FK_a48daec7bfcec8d7edbfc867481\``);
        await queryRunner.query(`ALTER TABLE \`user_question\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_question\` CHANGE \`questionId\` \`questionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_question\` ADD CONSTRAINT \`FK_64b66c10122a98bb8faaed64857\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_question\` ADD CONSTRAINT \`FK_a48daec7bfcec8d7edbfc867481\` FOREIGN KEY (\`questionId\`) REFERENCES \`question\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`daily_question_history\` ADD CONSTRAINT \`FK_4f832b937cf703a5419a706fdc0\` FOREIGN KEY (\`questionId\`) REFERENCES \`question\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`daily_question_history\` DROP FOREIGN KEY \`FK_4f832b937cf703a5419a706fdc0\``);
        await queryRunner.query(`ALTER TABLE \`user_question\` DROP FOREIGN KEY \`FK_a48daec7bfcec8d7edbfc867481\``);
        await queryRunner.query(`ALTER TABLE \`user_question\` DROP FOREIGN KEY \`FK_64b66c10122a98bb8faaed64857\``);
        await queryRunner.query(`ALTER TABLE \`user_question\` CHANGE \`questionId\` \`questionId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_question\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_question\` ADD CONSTRAINT \`FK_a48daec7bfcec8d7edbfc867481\` FOREIGN KEY (\`questionId\`) REFERENCES \`question\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_question\` ADD CONSTRAINT \`FK_64b66c10122a98bb8faaed64857\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`optionD\` \`optionD\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`optionC\` \`optionC\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`week\` \`week\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`insteadOf\` \`insteadOf\` varchar(255) COLLATE "utf8mb4_general_ci" NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`daily_question_history\``);
    }

}
