import express from "express"
import { UserController } from "../controllers/userController"
import { CategoryController } from "../controllers/categoryController"

export const publicRouter = express.Router()

publicRouter.post("/api/register", UserController.register)
publicRouter.post("/api/login", UserController.login)

publicRouter.post("/api/category/create", CategoryController.create)
publicRouter.get("/api/category/all", CategoryController.getAllCategory)