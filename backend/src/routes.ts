import { Router } from "express";
import UserController from "./controllers/UserController";

const routes = Router();

const userController = new UserController();

routes.post("/users", userController.create);
routes.get("/users", userController.show);
routes.delete("/users", userController.delete);

export default routes;