function validateFilesCurried(param, allowedExtensions = []) {
    return function (req, res, next) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                errors: [
                    {
                        msg: `The ${param} is required.`,
                        param,
                        location: 'files'
                    }
                ]
            })
        }

        const extension = req.files[param].name.split('.')[req.files[param].name.split('.').length - 1];

        if (!allowedExtensions.includes(extension)) {
            return res.status(400).json({
                errors: [
                    {
                        msg: `The format ${extension} isn't allowed.`,
                        param,
                        location: 'files'
                    }
                ]
            })
        }

        next();
    }
}

module.exports = { validateFiles: validateFilesCurried }