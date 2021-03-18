import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import CreateUserService from "../services/CreateUserService";

export default class UserController {
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
}