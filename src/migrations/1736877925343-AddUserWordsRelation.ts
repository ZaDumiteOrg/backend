import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserWordsRelation1736877925343 implements MigrationInterface {
    name = 'AddUserWordsRelation1736877925343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_words_word\` (\`userId\` int NOT NULL, \`wordId\` int NOT NULL, INDEX \`IDX_66d70c58b59b1aba106e17a613\` (\`userId\`), INDEX \`IDX_02b98eafcba69247559b60ddc7\` (\`wordId\`), PRIMARY KEY (\`userId\`, \`wordId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`insteadOf\` \`insteadOf\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`word\` \`word\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`word\` ADD UNIQUE INDEX \`IDX_8355d962fea7fe9fef57d58fff\` (\`word\`)`);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`week\` \`week\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_words_word\` ADD CONSTRAINT \`FK_66d70c58b59b1aba106e17a6135\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_words_word\` ADD CONSTRAINT \`FK_02b98eafcba69247559b60ddc7c\` FOREIGN KEY (\`wordId\`) REFERENCES \`word\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_words_word\` DROP FOREIGN KEY \`FK_02b98eafcba69247559b60ddc7c\``);
        await queryRunner.query(`ALTER TABLE \`user_words_word\` DROP FOREIGN KEY \`FK_66d70c58b59b1aba106e17a6135\``);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`week\` \`week\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`word\` DROP INDEX \`IDX_8355d962fea7fe9fef57d58fff\``);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`word\` \`word\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`word\` CHANGE \`insteadOf\` \`insteadOf\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_general_ci" NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_02b98eafcba69247559b60ddc7\` ON \`user_words_word\``);
        await queryRunner.query(`DROP INDEX \`IDX_66d70c58b59b1aba106e17a613\` ON \`user_words_word\``);
        await queryRunner.query(`DROP TABLE \`user_words_word\``);
    }

}
