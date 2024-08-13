import { MigrationInterface, QueryRunner } from "typeorm";
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import * as process from 'node:process';
import { EUserRole } from '../entities/enums/user-role.enum';

dotenv.config({ path: `environments/local.env` });
export class CreateTables1723207425925 implements MigrationInterface {
    name = 'CreateTables1723207425925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`comment\` text NOT NULL, \`order_id\` int NOT NULL, UNIQUE INDEX \`REL_9bb41adf4431f6de42c79c4d30\` (\`order_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`action_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`manager_id\` int NOT NULL, \`actionToken\` text NOT NULL, \`tokenType\` enum ('setup_manager') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`managers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` text NOT NULL, \`surname\` text NOT NULL, \`email\` text NOT NULL, \`password\` text NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 0, \`last_login\` date NOT NULL,
                                                            \`user_role\` enum ('ADMIN', 'MANAGER') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`refresh_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`refreshToken\` text NOT NULL, \`deviceId\` text NOT NULL, \`manager_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`groups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` text NOT NULL, \`order_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`manager_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD UNIQUE INDEX \`IDX_c23c7d2f3f13590a845802393d\` (\`manager_id\`)`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`id\` \`id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c23c7d2f3f13590a845802393d\` ON \`orders\` (\`manager_id\`)`);
        await queryRunner.query(`ALTER TABLE \`groups\` ADD CONSTRAINT \`FK_23b0a2cbe638a33606043ea38aa\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_9bb41adf4431f6de42c79c4d305\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_c23c7d2f3f13590a845802393d5\` FOREIGN KEY (\`manager_id\`) REFERENCES \`managers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`action_tokens\` ADD CONSTRAINT \`FK_9a62c6eaa46500d1278bc1bc700\` FOREIGN KEY (\`manager_id\`) REFERENCES \`managers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_4a3d2a11e760de57a0cc674a281\` FOREIGN KEY (\`manager_id\`) REFERENCES \`managers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);

        const name = process.env.ADMIN_NAME;
        const surname = process.env.ADMIN_SURNAME;
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const rounds = parseInt(process.env.HASH_PASSWORD_ROUNDS);

        const hashedPassword = await bcrypt.hash(password, rounds);

        await queryRunner.query(
          `INSERT INTO managers (name, surname, email, password, is_active, last_login, user_role) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [name, surname, email, hashedPassword, true, new Date(), EUserRole.ADMIN]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_4a3d2a11e760de57a0cc674a281\``);
        await queryRunner.query(`ALTER TABLE \`action_tokens\` DROP FOREIGN KEY \`FK_9a62c6eaa46500d1278bc1bc700\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_c23c7d2f3f13590a845802393d5\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_9bb41adf4431f6de42c79c4d305\``);
        await queryRunner.query(`ALTER TABLE \`groups\` DROP FOREIGN KEY \`FK_23b0a2cbe638a33606043ea38aa\``);
        await queryRunner.query(`DROP INDEX \`REL_c23c7d2f3f13590a845802393d\` ON \`orders\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`id\` \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP INDEX \`IDX_c23c7d2f3f13590a845802393d\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`manager_id\``);
        await queryRunner.query(`DROP TABLE \`refresh_tokens\``);
        await queryRunner.query(`DROP TABLE \`managers\``);
        await queryRunner.query(`DROP TABLE \`action_tokens\``);
        await queryRunner.query(`DROP INDEX \`REL_9bb41adf4431f6de42c79c4d30\` ON \`comments\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP TABLE \`groups\``);

        await queryRunner.query(
          `DELETE FROM managers WHERE email = ?`,
          [process.env.ADMIN_EMAIL || 'admin@gmail.com']
        );
    }

}
