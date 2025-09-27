import Advisor from "../models/advisor.js";
import Session from "../models/session.js";

export const getSessions = async (req, res, next) => {
    try {
        
        const advisorId = req.advisor.id;

        if (!advisorId) {
            return res.status(404).json({ success: false, message: "Advisor not found" });
        }

        const sessions = await Session.find({ advisorId: advisorId });

        if (!sessions || sessions.length === 0) {
            return res.status(404).json({ success: false, message: "No sessions found" });
        }

        res.status(200).json({ success: true, data: sessions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getAdvisorProfile = async (req, res, next) => {
    try {
        const advisorId = req.advisor.id;
        const advisor = await Advisor.findById(advisorId).select('-password'); // Exclude password field

        if (!advisor) {
            return res.status(404).json({ success: false, message: "Advisor not found" });
        }

        res.status(200).json({ success: true, data: advisor });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const cancelSession = async (req, res, next) => {
    res.status(200).json({success: true, data: "Session Cancelled"});
}

