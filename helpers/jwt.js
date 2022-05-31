const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '24h',
            },
            (err, token) => {
                if (err) {
                    reject('Could not generate token');
                }

                resolve(token);
            }
        );
    });
};

module.exports = {
    generateJWT
};