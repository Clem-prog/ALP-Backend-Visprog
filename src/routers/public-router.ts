import express from "express"
import { UserController } from "../controllers/userController"
import { CategoryController } from "../controllers/categoryController"
import { EventController } from "../controllers/eventController" 
import { ReviewController } from "../controllers/reviewController"
import { AttendanceController } from "../controllers/attendanceController"; 
import { AnnouncementController } from "../controllers/announcementController";

export const publicRouter = express.Router()

// User
publicRouter.post("/api/register", UserController.register)
publicRouter.post("/api/login", UserController.login)
publicRouter.get('/api/users', UserController.getAllUser)

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

//Review
publicRouter.post("/api/reviews", ReviewController.create);
publicRouter.get("/api/events/:eventId/reviews", ReviewController.getReviewsByEventId);
publicRouter.put("/api/reviews/:id", ReviewController.updateReview);
publicRouter.delete("/api/reviews/:id", ReviewController.deleteReview);

// Attendance routes (added)
publicRouter.post("/api/attendance", AttendanceController.createAttendance);
publicRouter.get("/api/attendance", AttendanceController.getAllAttendance);

// Announcement routes (added)
publicRouter.post("/api/announcement", AnnouncementController.createAnnouncement);
publicRouter.get("/api/announcement", AnnouncementController.getAllAnnouncements);
"The tunnel to summer, the exit of goodbye"