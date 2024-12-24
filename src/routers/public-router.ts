import express from "express"
import { UserController } from "../controllers/userController"
import { CategoryController } from "../controllers/categoryController"

export const publicRouter = express.Router()

publicRouter.post("/api/register", UserController.register)
publicRouter.post("/api/login", UserController.login)

publicRouter.post("/api/create-category", CategoryController.create)