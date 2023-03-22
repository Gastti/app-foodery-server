const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const colors = require('colors');
const database = require('./database');

const app = express();
const port = process.env.PORT || 5000;
const paths = {
    index: '/',
    auth: '/auth',
    users: '/users',
    cart: '/cart',
    products: '/products'
};

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(fileUpload({
    useTempFiles: false,
    tempFileDir: './uploads'
}));

// Routes
app.use(paths.index, require('./routes/index.routes'));
app.use(paths.auth, require('./routes/auth.routes'));
app.use(paths.users, require('./routes/user.routes'));
app.use(paths.cart, require('./routes/cart.routes'));
app.use(paths.products, require('./routes/product.routes'));

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
        await database.sync({ alter: true });
        console.log(`-- ${'Database:'.green} Connection has been established successfully.`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

function listen() {
    app.listen(port, () => {
        console.log(`-- ${'Server:'.green} Connection has been established successfully. ${'Port:'.green} ${port.yellow}`);
    });
};

module.exports = { testDatabaseConnection, listen };