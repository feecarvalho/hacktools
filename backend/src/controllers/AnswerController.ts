import { Request, Response } from "express";
import CreateAnswerService from "../services/CreateAnswerService";

export default class AnswerController {
  async create(request: Request, response: Response) {
    try {
      const { idQuestion, answer, latitude, longitude } = request.body;
      const createAnswerService = new CreateAnswerService();
  
      const createAnswer = await createAnswerService.execute({
        idQuestion,
        answer,
        latitude,
        longitude,
      });
  
      return response.status(201).json(createAnswer);
    } catch(error) {
      return response.status(error.statusCode).json(error.message);
    }
  }
}