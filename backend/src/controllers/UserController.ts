import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import CreateUserService from "../services/CreateUserService";

export default class UserController {
  async show(request: Request, response: Response) {
    try {
      const userRepository = getRepository(User);
      const users = await userRepository.find();
  
      if (!users.length) {
        return response.status(404).json({
          error: true,
          message: "Nenhum usuário encontrado."
        });
      }
  
      return response.json(users);
    } catch(error) {
      return response.status(400).json({ error: true, message: error.message });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const createUserService = new CreateUserService();
  
      const user = await createUserService.execute({
        email, password
      });
  
      return response.status(201).json(user);
    } catch(error) {
      return response.status(400).json({ error: true, message: error.message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { email } = request.body;
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ email });
  
      if (!user) {
        return response.status(404).json({
          error: true,
          message: "Usuário não encontrado."
        });
      }
  
      await userRepository.remove(user);
  
      return response.json({ message: "Usuário removido com sucesso." });
    } catch(error) {
      return response.status(400).json({ error: true, message: error.message });
    }
  }
}