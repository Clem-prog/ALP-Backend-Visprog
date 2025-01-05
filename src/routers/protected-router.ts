import express from "express";
import { userMiddleware } from "../middleware/user-middleware";
import { UserController } from "../controllers/userController";
import { CategoryController } from "../controllers/categoryController"
import { EventController } from "../controllers/eventController" 
import { ReviewController } from "../controllers/reviewController"
import { AttendanceController } from "../controllers/attendanceController";
import { AnnouncementController } from "../controllers/announcementController";

export const protectedRouter = express.Router()
protectedRouter.use(userMiddleware)

// User
protectedRouter.delete("/api/logout", UserController.logout)
protectedRouter.get("/api/user/:id", UserController.getUserById)
protectedRouter.put("/api/user/:id", UserController.updateUser)


// Category
protectedRouter.post("/api/category", CategoryController.create)
protectedRouter.put("/api/category/:id", CategoryController.update)
protectedRouter.put("/api/category/:id", CategoryController.delete)
protectedRouter.get("/api/category", CategoryController.getAllCategory)
protectedRouter.get("/api/category/:id", CategoryController.getCategoryById)

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

// Attendance
protectedRouter.post("/api/attendance", AttendanceController.createAttendance);
protectedRouter.get("/api/attendance", AttendanceController.getAllAttendance);

// Announcement
protectedRouter.post("/api/announcement", AnnouncementController.createAnnouncement);
protectedRouter.get("/api/announcement", AnnouncementController.getAllAnnouncements);
