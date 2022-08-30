import { Router } from "express";
import { operationController } from "../controllers/operationController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const operationRoutes = Router();

operationRoutes.get("/", AuthMiddleware, operationController.getByUser);

operationRoutes.post("/", AuthMiddleware, operationController.create);

export { operationRoutes };
