import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import jwtConfig from "../config/jwtConfig";
import AppError from "../errors/AppError";
import User from "../models/User";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticationService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    
    const user = await userRepository.findOne({ email });
    if (!user) {
      throw new AppError("E-mail ou senha inválido.", 401);
    }

    if (!(await compare(password, user.password))) {
      throw new AppError("E-mail ou senha inválido.", 401);
    }

    delete user.password;

    const token = sign({}, jwtConfig.secret, {
      subject: user.id,
      expiresIn: "7d",
    });

    return { user, token };
  }
}