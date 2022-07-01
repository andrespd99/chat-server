const User = require('../models/user');

const onUserConnected = async (uid = '') => {
    const user = await User.findById(uid);

    user.online = true;
    await user.save();

    return user;
}

const onUserDisconnected = async (uid = '') => {
    const user = await User.findById(uid);

    user.online = false;
    await user.save();

    return user;
}

module.exports = {
    onUserConnected,
    onUserDisconnected
}