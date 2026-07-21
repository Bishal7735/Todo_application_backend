import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from "express";
import { router } from "./route/index";
import { sequelize } from "./models";
import { initDb } from "./models/db";
import logger from "./logger";
import cors from 'cors';

const app: Application = express();
const port: number = Number(process.env.PORT) || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: true,
    credentials: true
}));

// Routes
app.use("/", router);  //router - API path

// Database connection and server initialization
const startServer = async (): Promise<void> => {
    try {
        await initDb();
        await sequelize.sync({ alter: true });
        console.log("Database connection & tables synchronized successfully.");
        logger.info("Database connection & tables synchronized successfully.");
    } catch (error) {
        console.error("Database connection/sync error:", error);
        logger.error("Database connection/sync error:", error);
    }

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        logger.info(`Server listening on port ${port}`);
    });
};

startServer();