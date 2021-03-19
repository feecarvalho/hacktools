import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Question from "../models/Question";
import CreateQuestionService from "../services/CreateQuestionService";

export default class QuestionController {
  async index(request: Request, response: Response) {
    try {
      const { idQuiz } = request.params;

      const questionRepository = getRepository(Question);
      const questions = await questionRepository.find({ idQuiz });

      if (!questions.length) {
        return response.status(404).json({
          error: true,
          message: "Ainda não foram cadastradas questões para este Quiz!"
        });
      }

      return response.json(questions);
    } catch(error) {
      return response.status(400).json(error.message);
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { question, idQuiz } = request.body;
      const createQuestionService = new CreateQuestionService();
  
      const newQuestion = await createQuestionService.execute({
        question,
        idQuiz,
      });
  
      return response.status(201).json(newQuestion);
    } catch(error) {
      return response.status(400).json(error.message);
    }
  }
}