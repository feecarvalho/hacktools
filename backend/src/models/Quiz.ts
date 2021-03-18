import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from "uuid";
import Question from './Question';
import User from "./User";

@Entity("quiz")
export default class Quiz {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  title: string;

  @Column({ name: "id_user" })
  idUser: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_user", referencedColumnName: "id" })
  user: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @OneToMany(() => Question, questions => questions.quiz)
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  questions: Array<Question>;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}