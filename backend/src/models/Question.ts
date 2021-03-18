import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import Answer from "./Answer";
import Quiz from "./Quiz";

@Entity("questions")
export default class Question {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ name: "id_quiz" })
  idQuiz: string;

  @ManyToOne(() => Quiz, quiz => quiz.questions)
  @JoinColumn({ name: "id_quiz", referencedColumnName: "id" })
  quiz: Quiz;

  @OneToMany(() => Answer, answers => answers.question)
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  answers: Array<Answer>

  @Column()
  question: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}