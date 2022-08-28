import { Router } from "express";

import { userController } from "../controllers/userController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const userRoutes = Router();

userRoutes.get("/auth", AuthMiddleware, userController.auth);

userRoutes.get("/", AuthMiddleware, userController.getAll);

userRoutes.get("/:id", userController.getById);

userRoutes.post("/", userController.create);

userRoutes.post("/login", userController.login);

userRoutes.delete("/", userController.deleteAll);

userRoutes.delete("/:id", userController.deleteById);

export { userRoutes };
