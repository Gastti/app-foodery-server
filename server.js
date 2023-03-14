const express = require('express');
const cors = require('cors');
const colors = require('colors');
const database = require('./src/database');

const app = express();
const port = process.env.PORT || 5000;
const paths = {
    index: '/',
    auth: '/auth',
    users: '/users'
};

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use(paths.index, require('./src/routes/index'));
app.use(paths.auth, require('./src/routes/auth'));
app.use(paths.users, require('./src/routes/user'));

// 404 Error
app.get('*', (req, res) => {
    res.json({
        status: 404,
        message: 'Not found'
    });
});


// Test Database Connection
async function testDatabaseConnection() {
    try {
        await database.authenticate();
        console.log(`-- ${'Database:'.green} Connection has been established successfully.`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

function listen() {
    app.listen(port, () => {
        console.log(`-- ${'Server:'.green} Connection has been established successfully. ${'Port:'.green} ${port.yellow}`);
    });
}

module.exports = { testDatabaseConnection, listen }