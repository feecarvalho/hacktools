import { Router } from "express";
import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";
import QuizController from "./controllers/QuizController";
import { ensureAuth } from "./middlewares/ensureAuth";

const routes = Router();

const userController = new UserController();
const quizController = new QuizController();
const sessionController = new SessionController();

routes.post("/sessions", sessionController.create);

routes.post("/users", userController.create);

routes.get("/quiz", ensureAuth, quizController.index);
routes.post("/quiz", ensureAuth, quizController.create);
routes.get("/quiz/:id", ensureAuth, quizController.indexOne);
routes.delete("/quiz/:id", ensureAuth, quizController.delete);

export default routes;