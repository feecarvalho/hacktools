import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAnswersTable1616035896405 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "answers",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "id_question",
                    type: "uuid",
                },
                {
                    name: "answer",
                    type: "varchar",
                },
                {
                    name: "latitude",
                    type: "decimal"
                },
                {
                    name: "longitude",
                    type: "decimal",
                },
            ],
            foreignKeys: [
                {
                    name: "FKQuestion",
                    columnNames: ["id_question"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "questions",
                    onDelete: "CASCADE",
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("answers");
    }
}
