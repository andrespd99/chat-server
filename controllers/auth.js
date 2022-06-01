const {
    response
} = require('express');

const bcrypt = require('bcryptjs');

const User = require('../models/user');
const {
    generateJWT
} = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const {
        email
    } = req.body;

    try {

        // Check if the user already exists.
        const emailExists = await User.findOne({
            email
        });
        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'This email is already registered'
            });
        }

        //Create a new User object. 
        const user = new User(req.body);

        //Encrypt the password.
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);

        //Save user in DB.
        await user.save();

        //Create JWT.
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error in the server. Contact the administrator'
        });
    }




};

const logIn = async (req, res = response) => {

    const {
        email,
        password
    } = req.body;

    try {

        // Check if the user already exists.
        const user = await User.findOne({
            email
        });

        //Check if the user exists.
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'The email or password is incorrect',
                code: 'wrong-email'
            });
        }

        //Compare passwords.
        const checkPassword = bcrypt.compareSync(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'The email or password is incorrect',
                code: 'wrong-password'
            });
        }

        //Create JWT.
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error in the server. Contact the administrator'
        });
    }




};

const renewToken = async (req, res = response) => {

    try {
        //Get uid from request body.
        const uid = req.uid;

        //Create JWT.
        const token = await generateJWT(uid);

        //Get user from DB.
        const user = await User.findById(uid);

        //Return user and token in resolve body.
        res.json({
            ok: true,
            user,
            token
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
    createUser,
    logIn,
    renewToken
}