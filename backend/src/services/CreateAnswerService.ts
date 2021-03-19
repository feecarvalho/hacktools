import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Answer from "../models/Answer";
import Question from "../models/Question";

interface Request {
  idQuestion: string,
  answer: string,
  latitude: number;
  longitude: number;
}

export default class CreateAnswerService {
  public async execute({
    idQuestion,
    answer,
    latitude,
    longitude,
  }: Request): Promise<Answer> {
    const answerRepository = getRepository(Answer);
    const questionRepository = getRepository(Question);
    const question = await questionRepository.findOne(idQuestion, {
      relations: ["answers"]
    });

    const createAnswer = answerRepository.create({
      idQuestion,
      answer,
      latitude,
      longitude
    });

    if (!question) {
      throw new AppError("A questão informada não existe!", 400);
    }

    await answerRepository.save(createAnswer);

    return createAnswer;
  }    
}
