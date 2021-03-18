import { Request, Response, NextFunction} from "express";
import AppError from "../errors/AppError";
import { verify } from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig";

interface Token {
  sub: string;
}

export const ensureAuth = (
  request: Request,
  response: Response,
  next: NextFunction
  ) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("Token não encontrado.", 401);

    }

    const [, token] = authHeader.split(" ");

    try {
      const validateToken = verify(token, jwtConfig.secret);

      const { sub } = validateToken as Token;

      request.user = {
        id: sub,
      }

      return next();
    } catch(error) {
      throw new AppError("Token inválido!", 401);
    }
  }
