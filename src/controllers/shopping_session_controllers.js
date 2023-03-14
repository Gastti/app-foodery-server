const Shopping_Session = require("../models").Shopping_Session;

async function generateShoppingSession(user_id) {
    try {
        const findShoppingSession = await Shopping_Session.findOne({ where: { user_id } });
        const shoppingSession = findShoppingSession
            ? findShoppingSession
            : await Shopping_Session.create({ user_id, total: 0, shoppingSessionId: user_id });

        console.log('SHOPPING SESSION CONTROLLERS', shoppingSession.id);
        return shoppingSession.id;
    } catch (error) {
        console.log(error);
        return null
    }
}



module.exports = {
    generateShoppingSession
}