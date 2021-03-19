import "reflect-metadata";
import "./database";
import cors from "cors";
import express from "express";
import routes from "./routes";

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333, () => console.log("[✓] Server rodando na porta 3333."));