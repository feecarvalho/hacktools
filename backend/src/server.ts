import express from "express";

const server = express();

server.use(express.json());

server.listen(3333, () => console.log("[✓] Server rodando na porta 3333."));