import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
    advisorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Advisor",
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["scheduled", "completed", "cancelled"],
        default: "scheduled"
    }
}, {
    timestamps: true
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;
