const Role = require('../models').Role;

function hasPermissionsCurried(roleName) {
    return async function (req, res, next) {
        try {
            const PERMISSIONS_LEVEL = { admin: 4, manager: 3, seller: 2, user: 1 }
            const { role_id } = req.authenticatedUser;
            const { permission_lvl } = await Role.findByPk(role_id);
            if (permission_lvl < PERMISSIONS_LEVEL[roleName]) {
                return res.status(403).json({
                    status: 403,
                    message: 'You do not have the necessary permissions to make this request.'
                })
            }

            next();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { hasPermissions: hasPermissionsCurried }