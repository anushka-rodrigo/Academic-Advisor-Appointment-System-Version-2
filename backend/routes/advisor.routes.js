import { Router } from "express";
import { cancelSession, getAdvisorProfile, getSessions } from "../controller/advisorController.js";
import { authorizeAdvisor } from "../middleware/authMiddleware.js";

const advisorRouter = Router();

advisorRouter.get('/profile', authorizeAdvisor, getAdvisorProfile);
advisorRouter.get('/sessions', authorizeAdvisor, getSessions);
advisorRouter.post('/cancel/:id', authorizeAdvisor, cancelSession);

export default advisorRouter;