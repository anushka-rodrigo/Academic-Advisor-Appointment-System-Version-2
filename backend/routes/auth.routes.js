import { Router } from "express";
import { advisorLogin, advisorLogout, advisorRegister, studentLogin, studentLogout, studentRegister } from "../controller/authController.js";

const authRouter = Router();

authRouter.post('/student/login', studentLogin);
authRouter.post('/student/register', studentRegister);
authRouter.post('/student/logout', studentLogout);

authRouter.post('/advisor/login', advisorLogin);
authRouter.post('/advisor/register', advisorRegister);
authRouter.post('/advisor/logout', advisorLogout);

export default authRouter;