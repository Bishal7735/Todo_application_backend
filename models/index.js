const sequelize = require('./db');

// Import all models
const User = require('./user');
const Task = require('./task');
const UserTask = require('./user_task');

// Associations
// User -> UserTask
User.hasMany(UserTask, {
    foreignKey: 'user_id',
    as: 'user_tasks'
});

// Task -> UserTask
Task.hasMany(UserTask, {
    foreignKey: 'task_id',
    as: 'task_users'
});

// UserTask -> User
UserTask.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

// UserTask -> Task
UserTask.belongsTo(Task, {
    foreignKey: 'task_id',
    as: 'task'
});


// Export everything

module.exports = {
    sequelize,
    User,
    Task,
    UserTask
};