const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./user');
const Task = require('./task');
const UserTask = sequelize.define('user_task', {
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
        allowNull: false,
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

// UserTask.belongsTo(User, {
//     foreignKey: 'user_id',
//     as: 'user'
// });

// UserTask.belongsTo(Task, {
//     foreignKey: 'task_id',
//     as: 'task'
// });

module.exports = UserTask;