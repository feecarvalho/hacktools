import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateQuestionsTable1616035815368 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "questions",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "id_quiz",
                    type: "uuid",
                },
                {
                    name: "question",
                    type: "varchar",
                },
            ],
            foreignKeys: [
                {
                    name: "FKQuiz",
                    columnNames: ["id_quiz"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "quiz",
                    onDelete: "CASCADE",
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("questions");
    }
}
