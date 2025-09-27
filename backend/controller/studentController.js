import Advisor from "../models/advisor.js";
import Session from "../models/session.js";
import Student from "../models/student.js";

export const bookSession = async (req, res, next) => {
    try {
        
        const advisorId = req.body.advisorId;

        const isSessionAvailableForThatTime = await Session.findOne({ date: req.body.date, time: req.body.time });

        if (isSessionAvailableForThatTime) {
            return res.status(404).json({ success: false, message: "Session not available at this time" });
        }

        // Logic to book the session
        const newSession = new Session({
            advisorId: advisorId,
            studentId: req.body.studentId,
            time: req.body.time,
            date: req.body.date
        });

        await newSession.save();

        res.status(200).json({ success: true, data: `Book a Session ${advisorId}` });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getBookedSessions = async (req, res, next) => {

    const userId = req.params.id;
    try {
        const bookedSessions = await Session.find({ studentId: userId });

        if (!bookedSessions || bookedSessions.length === 0) {
            return res.status(200).json({ success: false, message: "No booked sessions found" });
        }

        res.status(200).json({ success: true, data: bookedSessions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getAllAdvisors = async (req, res, next) => {
    try {
        const availableSessions = await Advisor.find();
        res.status(200).json({ success: true, data: availableSessions });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getStudentProfile = async (req, res, next) => {
    try {
        const studentId = req.student.id;
        const student = await Student.findById(studentId).select('-password'); // Exclude password field

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const cancelSession = async (req, res, next) => {
    try {
        const sessionId = req.params.id;
        const studentId = req.student.id;

        const session = await Session.findOne({ _id: sessionId, studentId: studentId });

        console.log(session);
        

        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }

        session.status = 'cancelled';
        await session.save();

        res.status(200).json({ success: true, message: "Session cancelled successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}