require('dotenv').config()

module.exports = {
    "database": {
        "development": {
            "username": process.env.DB_USER,
            "password": process.env.DB_PASSWORD,
            "database": process.env.DB_NAME,
            "host": process.env.DB_HOST,
            "port": process.env.DB_PORT,
            "dialect": "mysql",
            "logging": false
        },
        "test": {
            "username": process.env.DB_USER,
            "password": process.env.DB_PASSWORD,
            "database": process.env.DB_NAME,
            "host": process.env.DB_HOST,
            "dialect": "mysql",
            "logging": false
        },
        "production": {
            "username": process.env.DB_USER,
            "password": process.env.DB_PASSWORD,
            "database": process.env.DB_NAME,
            "host": process.env.DB_HOST,
            "dialect": "mysql"
        }
    },
    "server": {
        "SECRET_KEY": process.env.SECRET_KEY
    }
}