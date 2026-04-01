const express = require('express');
const app = express();
const port = 3000;

//Routes
var indexRouter = require('./route/index');
app.use('/', indexRouter);

//DATABASE
const { sequelize } = require('./models');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connection established successfully.');
        await sequelize.sync({ force: true });
        var tables = require('./models')
    } catch (error) {
        console.error('Unable to connect to database:', error);
    }
})();


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});