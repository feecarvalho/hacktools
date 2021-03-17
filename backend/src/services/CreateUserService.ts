import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import AppError from "../errors/AppError";
import User from "../models/User";

interface Request {
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ email, password}: Request): Promise<User> {
    const userRepository = getRepository(User);

    const hashedUserPassword = await hash(password, 4);

    if (await userRepository.findOne({ where: { email } })) {
      throw new AppError("Este e-mail já está sendo utilizado.", 400);
    }

    const user = userRepository.create({
      email,
      password: hashedUserPassword,
    });

    await userRepository.save(user);

    return user;
  }
}