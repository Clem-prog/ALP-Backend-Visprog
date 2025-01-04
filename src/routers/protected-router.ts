import express from "express";
import { userMiddleware } from "../middleware/user-middleware";
import { UserController } from "../controllers/userController";
import { CategoryController } from "../controllers/categoryController"
import { EventController } from "../controllers/eventController" 
import { ReviewController } from "../controllers/reviewController"

export const protectedRouter = express.Router()
protectedRouter.use(userMiddleware)

protectedRouter.delete("/api/logout", UserController.logout)

// Category
protectedRouter.post("/api/category", CategoryController.create)
protectedRouter.put("/api/category", CategoryController.update)
protectedRouter.get("/api/category/all", CategoryController.getAllCategory)

// Event
protectedRouter.post("/api/events", EventController.create)
protectedRouter.get("/api/events", EventController.getAllEvents)
protectedRouter.get("/api/events/:id", EventController.getEventById)
protectedRouter.put("/api/events/:id", EventController.updateEvent)
protectedRouter.delete("/api/events/:id", EventController.deleteEvent)

//Review
protectedRouter.post("/api/reviews", ReviewController.create);
protectedRouter.get("/api/events/:eventId/reviews", ReviewController.getReviewsByEventId);
protectedRouter.put("/api/reviews/:id", ReviewController.updateReview);
protectedRouter.delete("/api/reviews/:id", ReviewController.deleteReview);
