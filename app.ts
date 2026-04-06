import express, { Application } from "express";
// Corrected: Import the default export without curly braces
import indexRouter from "./route/index";
import { sequelize } from "./models";

const app: Application = express();
const port: number = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", indexRouter);

// Database connection
const startServer = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("MySQL connection established successfully.");

        // Note: force: true will drop your tables every time the server restarts.
        // Use { alter: true } in development if you want to keep your data.
        await sequelize.sync({ force: true });

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to database:", error);
    }
};

startServer();