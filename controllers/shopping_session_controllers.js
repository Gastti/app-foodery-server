const Shopping_Session = require("../models").Shopping_Session;

async function generateShoppingSession(user_id) {

    const findShoppingSession = await Shopping_Session.findOne({ where: { user_id } });
    const shoppingSession = findShoppingSession
        ? findShoppingSession
        : await Shopping_Session.create({ user_id, total: 0, shoppingSessionId: user_id });

    // if (!findShoppingSession) {
    //     Shopping_Session.create({
    //         user_id,
    //         total: 0
    //     });
    // }
    
    console.log('SHOPPING SESSION CONTROLLERS', shoppingSession.id);
    return shoppingSession.id;
}



module.exports = {
    generateShoppingSession
}