import { Sequelize } from "sequelize";

export const sequelize: Sequelize = new Sequelize('task_manager', 'root', 'ROOT', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
});