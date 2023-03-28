const User = require("../models").User;
const bcryptjs = require("bcryptjs");
const { newResponse } = require("../utils/newResponse");
const { generateCart } = require("./cart_controllers");
const generateToken = require("../helpers/jsonwebtoken");

async function register(req, res) {
    try {
        let {
            first_name, last_name, username,
            email, password
        } = req.body;

        const image = 'https://foodery-product-images.s3.sa-east-1.amazonaws.com/1679610427588-avatar.png'
        // Encrypt Password 
        const salt = bcryptjs.genSaltSync(15);
        password = bcryptjs.hashSync(password, salt);

        await User.create({
            first_name, last_name, username,
            email, password, role_id: 4, image
        });

        return newResponse(res, 200, 'The user has been registered');

    } catch (error) {
        console.log(error);
        return newResponse(res, 500, 'Server side error');
    }
}

async function login(req, res) {
    try {
        const { email, username, password } = req.body;

        let user;
        if (email) user = await User.findOne({ where: { email } });
        if (username) user = await User.findOne({ where: { username } });

        if (!user) return newResponse(res, 404, 'User does not exist');

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) return newResponse(res, 404, 'Invalid password')

        // Generate Shopping Session only the First Time
        const cart = await generateCart(user.id);

        // Generate and Send Token
        const token = await generateToken(user.id, cart.id);
        return newResponse(res, 200, 'Logged in.', { token });

    } catch (error) {
        console.log(error);
        return newResponse(res, 500, 'Server side error');
    }
}


module.exports = { register, login }