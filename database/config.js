const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('Database online.');
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to database. Contact the administrator.');
    }
}

module.exports = {
    dbConnection
}