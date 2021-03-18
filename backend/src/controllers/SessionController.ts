import { Request, Response } from "express";
import AuthenticationService from "../services/AuthenticationService";

export default class SessionController {
  async create(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const authenticationService = new AuthenticationService();
  
      const { user, token } = await authenticationService.execute({
        email, password
      });
  
      return response.status(200).json({ user, token });
    } catch(error) {
      return response.status(401).json({ error: true, message: error.message });
    }
  }
}