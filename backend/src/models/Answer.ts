import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import Question from "./Question";

@Entity("answers")
export default class Answer {
  @PrimaryColumn("uuid")
  id: string;

  @Column("uuid", { name: "id_question" })
  idQuestion: string;

  @Column("varchar")
  answer: string;

  @Column("decimal")
  latitude: number;

  @Column("decimal")
  longitude: number;

  @ManyToOne(() => Question, question => question.answers)
  @JoinColumn({ name: "id_question", referencedColumnName: "id" })
  question: Question;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}