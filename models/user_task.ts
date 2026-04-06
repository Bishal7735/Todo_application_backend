// const { DataTypes } = require('sequelize');
import { DataTypes } from "sequelize";
import {sequelize} from './db'
// import { User } from "./user";
// import { Task } from "./task";
export const UserTask = sequelize.define('user_task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    task_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: 'task',
            key: 'id',
        }
    },
    status: DataTypes.STRING,
    started_at: DataTypes.TIME,
    ended_at: DataTypes.TIME,
    priority: DataTypes.STRING
}, {
    tableName: 'user_task',
    timestamps: true
});
