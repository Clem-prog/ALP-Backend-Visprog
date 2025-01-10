import express from "express"
import { UserController } from "../controllers/userController"
import { ReviewController } from "../controllers/reviewController"

export const publicRouter = express.Router()

// User
publicRouter.post("/api/register", UserController.register)
publicRouter.post("/api/login", UserController.login)
publicRouter.get('/api/users', UserController.getAllUser)
publicRouter.get("/api/reviews", ReviewController.getAllReviews)

"The tunnel to summer, the exit of goodbye"