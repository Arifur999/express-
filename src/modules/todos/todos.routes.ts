import express, { Request, Response } from "express"
import { todosController } from "./todos.controller";

const router =express.Router();

router.post("/",todosController.createTodos);

