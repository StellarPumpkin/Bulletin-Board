const Sequelize = require('sequelize');

//sequelize connection with database
const connection = new Sequelize('bulletinboard', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false
});
//Define the model
const Message = connection.define('message', {
    title: Sequelize.TEXT,
    body: Sequelize.TEXT
});

//create table
connection.sync()
    .then(() => console.log(`Table for messages is ready!`))
    .catch((error) => console.log(`Aoaoao something is soo wrong, panic and look at this error: ${error.stack}`));

module.exports = Message;