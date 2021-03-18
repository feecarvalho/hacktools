import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Quiz from "../models/Quiz";

interface Request {
  title: string,
  idUser: string,
}

export default class CreateQuizService {
  public async execute({ title, idUser }: Request): Promise<Quiz> {
    const quizRepository = getRepository(Quiz);

    if (await quizRepository.findOne(title)) {
      throw new AppError("Já existe um dicionário com este título!", 400);
    }

    const quiz = quizRepository.create({
      title, idUser
    });

    await quizRepository.save(quiz);

    return quiz;
  }
}
