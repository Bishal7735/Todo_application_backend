const express = require('express');
const app = express();
const port = 3000;

//Routes
var indexRouter = require('./route/index');
var usersRouter = require('./route/users');
var authRouter = require('./route/auth');
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

//DATABASE
const sequelize = require('./models/db');
const User = require('./models/user');
const Task = require('./models/task');
const UserTask = require('./models/user_task');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connection established successfully.');
        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error('Unable to connect to database:', error);
    }
})();


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});