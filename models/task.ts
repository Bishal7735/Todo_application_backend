// const { DataTypes } = require('sequelize');
import { DataTypes } from "sequelize";
import { sequelize } from "./db";
// const sequelize = require('./db');
// const UserTask = require('./user_task');

export const Task = sequelize.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    external_id: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: DataTypes.TIME,
    updatedAt: DataTypes.TIME,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
}, {
    tableName: 'task',
    timestamps: true
});

