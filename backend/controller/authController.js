import mongoose from "mongoose";
import Student from "../models/student.js";
import bcrypt from "bcryptjs";
import { JWT_SECRET, EXPIRATION_TIME } from "../config/env.js";
import jwt from "jsonwebtoken";
import Advisor from "../models/advisor.js";

export const studentRegister = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {firstName, lastName, email, password} = req.body;

        //check if s student already exists
        const existingStudent = await Student.findOne({email});

        if (existingStudent) {
            throw new Error("Student already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStudent = await Student.create([{firstName,lastName,email,password: hashedPassword}], { session });

        const token = jwt.sign({ studentId: newStudent[0]._id, role: newStudent[0].role }, JWT_SECRET, { expiresIn: EXPIRATION_TIME });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "Student registered successfully",
            data: {
                token,
                student: newStudent[0],
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const studentLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const student = await Student.findOne({email});

        if (!student) {
            throw new Error("Student not found");
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);

        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = jwt.sign({ studentId: student._id, role: student.role }, JWT_SECRET, { expiresIn: EXPIRATION_TIME });

        res.status(200).json({
            success: true,
            message: "Student logged in successfully",
            data: {
                token,
                student
            }
        });

    } catch (error) {
        next(error);
    }
};

export const studentLogout = async (req, res, next) => {
    try {
        const { studentId } = req.body;

        // Invalidate the token (implementation depends on your strategy)
        // For example, you might add the token to a blacklist

        res.status(200).json({
            success: true,
            message: "Student logged out successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const advisorRegister = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {firstName, lastName, subject, email, password} = req.body;

        //check if an advisor already exists
        const existingAdvisor = await Advisor.findOne({email});

        if (existingAdvisor) {
            throw new Error("Advisor already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdvisor = await Advisor.create([{firstName,lastName,subject,email,password: hashedPassword}], { session });

        const token = jwt.sign({ advisorId: newAdvisor[0]._id, role: newAdvisor[0].role }, JWT_SECRET, { expiresIn: EXPIRATION_TIME });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "Advisor registered successfully",
            data: {
                token,
                advisor: newAdvisor[0],
            }
        });
        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const advisorLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const advisor = await Advisor.findOne({email});

        if (!advisor) {
            throw new Error("Advisor not found");
        }

        const isPasswordValid = await bcrypt.compare(password, advisor.password);

        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = jwt.sign({ advisorId: advisor._id, role: advisor.role }, JWT_SECRET, { expiresIn: EXPIRATION_TIME });

        res.status(200).json({
            success: true,
            message: "Advisor logged in successfully",
            data: {
                token,
                advisor
            }
        });

    } catch (error) {
        next(error);
    }
};

export const advisorLogout = async (req, res, next) => {
    // Logout logic
    try {
        const { advisorId } = req.body;

        // Invalidate the token (implementation depends on your strategy)
        // For example, you might add the token to a blacklist

        res.status(200).json({
            success: true,
            message: "Advisor logged out successfully"
        });
    } catch (error) {
        next(error);
    }
};