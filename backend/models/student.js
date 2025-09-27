import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'student'
    }
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

export default Student;
