import express, { Application } from "express";
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

    await sequelize.sync({ force: true });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
};

startServer();