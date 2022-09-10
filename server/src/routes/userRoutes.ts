import { Router } from "express";

import { userController } from "../controllers/userController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const userRoutes = Router();

userRoutes.get("/auth", AuthMiddleware, userController.auth);

userRoutes.get("/verify", userController.verifyEmail);

userRoutes.get("/check-recover-password-token", userController.validateRecoverPasswordToken);

userRoutes.get("/", AuthMiddleware, userController.getAll);

userRoutes.get("/:id", userController.getById);

userRoutes.post("/", userController.create);

userRoutes.post("/login", userController.login);

userRoutes.post("/forgot-password", userController.forgotPassword)

userRoutes.post("/recover", userController.recoverPassword)

userRoutes.patch("/new-email-validation-code", AuthMiddleware, userController.newEmailValidationCode);

userRoutes.delete("/", userController.deleteAll);

userRoutes.delete("/:id", userController.deleteById);

export { userRoutes };
