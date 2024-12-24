import express from "express";
import { userMiddleware } from "../middleware/user-middleware";
import { UserController } from "../controllers/userController";

export const protectedRouter = express.Router()
protectedRouter.use(userMiddleware)

protectedRouter.delete("/api/logout", UserController.logout)
