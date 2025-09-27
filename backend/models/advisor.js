import mongoose from "mongoose";

const advisorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    subject: {
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
        default: 'advisor'
    }
}, { timestamps: true });

const Advisor = mongoose.model("Advisor", advisorSchema);

export default Advisor;
