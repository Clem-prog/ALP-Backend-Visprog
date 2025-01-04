import express from "express"
import { UserController } from "../controllers/userController"

export const publicRouter = express.Router()

// User
publicRouter.post("/api/register", UserController.register)
publicRouter.post("/api/login", UserController.login)
publicRouter.get('/api/users', UserController.getAllUser)

"The tunnel to summer, the exit of goodbye"