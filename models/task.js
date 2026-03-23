const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const UserTask = require('./userTask');

const Task = sequelize.define('task', {
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

Task.hasMany(UserTask, {
    foreignKey: 'task_id',
    as: 'tasks'
});

module.exports = Task;
