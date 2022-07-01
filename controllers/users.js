const {
    response
} = require('express');

const
    User = require('../models/user');

const getUsers = async (req, res = response) => {

    try {
        const uid = req.body.uid;

        const users = await User.find({
            _id: {
                $ne: uid
            }
        }).sort('-online');

        res.json({
            ok: true,
            users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error in the server. Contact the administrator'
        });
    }
}

module.exports = {
    getUsers
}