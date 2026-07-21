import {sequelize} from "./db";
import {DataTypes}  from "sequelize";
import {UserTask} from "./user_task";

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
    due_date : {
        type: DataTypes.DATE,
        field: 'dueDate'
    },
    notes: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },

    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,

    priority:DataTypes.STRING,
}, 

{
    tableName: 'task',
    timestamps: true
});

Task.hasMany(UserTask, {
    foreignKey: 'task_id',
    as: 'tasks'
});

export default Task;