import { Router } from "express";

import QuizController from "./controllers/QuizController";
import UserController from "./controllers/UserController";
import AnswerController from "./controllers/AnswerController";
import SessionController from "./controllers/SessionController";
import QuestionController from "./controllers/QuestionController";

import { ensureAuth } from "./middlewares/ensureAuth";

const routes = Router();

const userController = new UserController();
const quizController = new QuizController();
const answerController = new AnswerController();
const sessionController = new SessionController();
const questionController = new QuestionController();

routes.post("/users", userController.create);

routes.post("/sessions", sessionController.create);

routes.get("/quiz", ensureAuth, quizController.index);
routes.post("/quiz", ensureAuth, quizController.create);
routes.get("/quiz/:id", ensureAuth, quizController.indexOne);
routes.delete("/quiz/:id", ensureAuth, quizController.delete);

routes.get("/questions", ensureAuth, questionController.index);
routes.post("/questions", ensureAuth, questionController.create);

routes.post("/answers", ensureAuth, answerController.create);

export default routes;