const express = require('express');
const cors = require('cors');
const colors = require('colors');
const database = require('./database');

const app = express();
const port = process.env.PORT || 5000;
const paths = {
    index: '/',
    auth: '/auth'
};

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use(paths.index, require('./routes/index'));
app.use(paths.auth,  require('./routes/auth'));

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