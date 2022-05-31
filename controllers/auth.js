const {
    response
} = require('express');

const User = require('../models/user');

const createUser = async (req, res = response) => {

    const {
        email
    } = req.body;

    try {

        // Check if the user already exists
        const emailExists = await User.findOne({
            email
        });
        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'This email is already registered'
            });
        }

        const user = new User(req.body);

        await user.save();

        res.json({
            ok: true,
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error in the server. Contact the administrator'
        });
    }




};

module.exports = {
    createUser
}