import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from "express";
import { router } from "./route/index";
import { sequelize } from "./models";
import logger from "./logger";
const app: Application = express();
const port: number = 4000;

// Middleware
import cors from 'cors';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000'
}));

// Routes
app.use("/", router);  //router - API path


// Database connection
const startServer = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("MySQL connection established successfully.");
        logger.info("MySQL connection established successfully.");

        await sequelize.sync({ alter: false });

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to database:", error);
        logger.error("Unable to connect to database:", error);
    }
};

startServer();