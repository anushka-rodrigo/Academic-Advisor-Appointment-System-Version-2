import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import Student from "../models/student.js";
import Advisor from "../models/advisor.js";

const authorizeStudent = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        
        const student = await Student.findById(decoded.studentId);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        
        req.student = student;

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized", error:error.message });
    }
}

const authorizeAdvisor = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const advisor = await Advisor.findById(decoded.advisorId);

        if (!advisor) {
            return res.status(404).json({ message: "Advisor not found" });
        }

        req.advisor = advisor;

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized", error:error.message });
    }
};

export { authorizeStudent, authorizeAdvisor };
