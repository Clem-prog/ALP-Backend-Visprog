import express from "express"
import { UserController } from "../controllers/userController"
import { CategoryController } from "../controllers/categoryController"
import { EventController } from "../controllers/eventController" 

export const publicRouter = express.Router()

// User
publicRouter.post("/api/register", UserController.register)
publicRouter.post("/api/login", UserController.login)

// Category
publicRouter.post("/api/category", CategoryController.create)
publicRouter.put("/api/category", CategoryController.update)
publicRouter.get("/api/category/all", CategoryController.getAllCategory)

// Event
publicRouter.post("/api/events", EventController.create)
publicRouter.get("/api/events", EventController.getAllEvents)
publicRouter.get("/api/events/:id", EventController.getEventById)
publicRouter.put("/api/events/:id", EventController.updateEvent)
publicRouter.delete("/api/events/:id", EventController.deleteEvent)



"The tunnel to summer, the exit of goodbye"