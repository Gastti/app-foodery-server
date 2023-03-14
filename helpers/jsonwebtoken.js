const jwt = require('jsonwebtoken');
const config = require(__dirname + '/../config/config').server;

const generateToken = (id = '', shopping_session_id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id, shopping_session_id };
        jwt.sign(payload, config.SECRET_KEY, {
            expiresIn: '60m'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Failed to create token.')
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = generateToken;