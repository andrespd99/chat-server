const {
    validationResult
} = require('express-validator');

const checkFields = (req, res, next) => {
    const errs = validationResult(req);

    if (!errs.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errs.mapped(),
            msg: 'Bad request: some fields are missing or invalid',
        });
    }

    next();
}

module.exports = {
    checkFields
};