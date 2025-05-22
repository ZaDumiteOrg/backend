import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserQuestion1741855645018 implements MigrationInterface {
    name = 'AddUserQuestion1741855645018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_question\` (\`id\` int NOT NULL AUTO_INCREMENT, \`selectedOption\` varchar(255) NOT NULL, \`isCorrect\` tinyint NOT NULL DEFAULT 0, \`answeredAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`questionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`totalScore\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`insteadOf\` \`insteadOf\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`week\` \`week\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`questionText\``);
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`questionText\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`optionC\` \`optionC\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`optionD\` \`optionD\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_question\` ADD CONSTRAINT \`FK_64b66c10122a98bb8faaed64857\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_question\` ADD CONSTRAINT \`FK_a48daec7bfcec8d7edbfc867481\` FOREIGN KEY (\`questionId\`) REFERENCES \`question\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_question\` DROP FOREIGN KEY \`FK_a48daec7bfcec8d7edbfc867481\``);
        await queryRunner.query(`ALTER TABLE \`user_question\` DROP FOREIGN KEY \`FK_64b66c10122a98bb8faaed64857\``);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`optionD\` \`optionD\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`optionC\` \`optionC\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`questionText\``);
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`questionText\` mediumtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`week\` \`week\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`insteadOf\` \`insteadOf\` varchar(255) COLLATE "utf8mb4_general_ci" NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`totalScore\``);
        await queryRunner.query(`DROP TABLE \`user_question\``);
    }

}
