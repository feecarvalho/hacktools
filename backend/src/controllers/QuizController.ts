import { Request, Response } from "express";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Quiz from "../models/Quiz";
import CreateQuizService from "../services/CreateQuizService";

export default class QuizController {
  async index(request: Request, response: Response) {
    try {
      const quizRepository = getRepository(Quiz);

      const quiz = await quizRepository.find({
        where: { idUser: request.user.id },
        relations: ["questions", "questions.answers"],
      });
   
      if (!quiz.length) {
        return response.status(404).json({
          error: true,
          message: "Nenhum quiz encontrado."
        });
      }
    
      return response.json(quiz);
    } catch(error) {
      return response.status(400).json(error.message);
    }
  }

  async indexOne(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const quizRepository = getRepository(Quiz);

      const quiz = await quizRepository.findOne({
        where: { idUser: request.user.id, id },
        relations: ["questions", "questions.answers"],
      });
   
      if (!quiz) {
        return response.status(404).json({
          error: true,
          message: "Nenhum quiz encontrado."
        });
      }
    
      return response.json(quiz);
    } catch(error) {
      return response.status(400).json(error.message);
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { title } = request.body;
      const idUser = request.user.id;
      const createQuizService = new CreateQuizService();
  
      const quiz = await createQuizService.execute({
        title, idUser
      });
  
      return response.status(201).json(quiz);
    } catch(error) {
      return response.status(400).json(error.message);
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
  
      const quizRepository = getRepository(Quiz);
      
      const quiz = await quizRepository.findOne(id);
  
      if (!quiz) {
        throw new AppError("Quiz não encontrado.", 404)
      }
  
      await quizRepository.remove(quiz);
  
      return response.json({ message: "Quiz deletado." });
    } catch(error) {
      return response.status(400).json(error.message);
    }
  }
}
