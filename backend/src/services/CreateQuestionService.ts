import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Question from "../models/Question";
import Quiz from "../models/Quiz";

interface Request {
  question: string,
  idQuiz: string,
}

export default class CreateQuestionService {
  public async execute({ question, idQuiz }: Request): Promise<Question> {
    const quizRepository = getRepository(Quiz);
    const questionRepository = getRepository(Question);

    if (!(await quizRepository.findOne(idQuiz))) {
      throw new AppError(
        "Não foi possível cadastrar a questão. Quiz não encontrado!",
        404
      );
    }

    const newQuestion = questionRepository.create({
      question,
      idQuiz,
    });

    await questionRepository.save(newQuestion);

    return newQuestion;
  }    
}
