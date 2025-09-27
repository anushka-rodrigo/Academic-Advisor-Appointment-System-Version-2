import express, { json, urlencoded } from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import studentRouter from "./routes/student.routes.js";
import authRouter from "./routes/auth.routes.js";
import advisorRouter from "./routes/advisor.routes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/student',studentRouter);
app.use('/api/v1/advisor',advisorRouter);

app.use(errorMiddleware);

const startServer = async () => {
    try {
        await connectToDatabase(); //Connect to MongoDB First

        app.listen(PORT, async () => {
            console.log(`Server running on PORT ${PORT}`);
        });
    } catch (error) {
        console.log(`Failed to start server: ${error}`);
        process.exit(1);
    }
}

startServer();


