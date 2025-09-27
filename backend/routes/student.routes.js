import { Router } from "express";
import { bookSession, getBookedSessions, getAllAdvisors, getStudentProfile, cancelSession } from "../controller/studentController.js";
import { authorizeStudent } from "../middleware/authMiddleware.js";

const studentRouter = Router();

studentRouter.get('/profile', authorizeStudent, getStudentProfile);
studentRouter.post('/book-session', authorizeStudent, bookSession);
studentRouter.get('/booked-sessions/:id', authorizeStudent, getBookedSessions);
studentRouter.post('/cancel-session/:id', authorizeStudent, cancelSession);
studentRouter.get('/advisors', getAllAdvisors);

export default studentRouter;