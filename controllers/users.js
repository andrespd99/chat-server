const {
    response
} = require('express');

const
    User = require('../models/user');

const getUsers = async (req, res = response) => {

    const startAt = Number(req.query.startAt) || 0;

    try {
        const uid = req.uid;

        const users = await User.find({
            _id: {
                $ne: uid
            }
        }).sort('-online').skip(startAt);

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