import { Sequelize } from "sequelize";
import path from "path";

let sequelizeInstance: Sequelize | null = null;

const DB_NAME = process.env.DB_NAME || 'task_manager';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'ROOT';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT) || 3306;

export const initDb = async (): Promise<Sequelize> => {
    if (sequelizeInstance) return sequelizeInstance;

    // 1. Try MySQL connection with database auto-creation
    try {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASS,
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
        await connection.end();

        const mysqlSequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
            host: DB_HOST,
            port: DB_PORT,
            dialect: 'mysql',
            logging: false,
        });

        await mysqlSequelize.authenticate();
        console.log("MySQL connection established successfully.");
        sequelizeInstance = mysqlSequelize;
        return sequelizeInstance;
    } catch (mysqlError) {
        console.warn("MySQL connection unavailable. Falling back to SQLite database.", mysqlError);
    }

    // 2. Fallback to SQLite
    const dbPath = path.join(__dirname, '../../task_manager.sqlite');
    const sqliteSequelize = new Sequelize({
        dialect: 'sqlite',
        storage: dbPath,
        logging: false,
    });

    await sqliteSequelize.authenticate();
    console.log(`SQLite connection established successfully at ${dbPath}`);
    sequelizeInstance = sqliteSequelize;
    return sequelizeInstance;
};

// Proxy export for transparent compatibility with existing models
export const sequelize: Sequelize = new Proxy({} as Sequelize, {
    get(_target, prop: keyof Sequelize) {
        if (!sequelizeInstance) {
            // Default sync fallback if called before initDb
            sequelizeInstance = new Sequelize({
                dialect: 'sqlite',
                storage: path.join(__dirname, '../../task_manager.sqlite'),
                logging: false,
            });
        }
        const val = (sequelizeInstance as any)[prop];
        return typeof val === 'function' ? val.bind(sequelizeInstance) : val;
    }
});


