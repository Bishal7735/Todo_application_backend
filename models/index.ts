import { sequelize } from "./db";

// Import all models
import {User}  from "./user";
import {Task}  from "./task";
import {UserTask} from "./user_task";

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
export { sequelize, User, Task, UserTask };