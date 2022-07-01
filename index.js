const express = require('express');
const path = require('path');
require('dotenv').config();

const {
    dbConnection
} = require('./database/config');
dbConnection();


// Express app
const app = express();

// Reading and parse of the body
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

// Public path
const pubPath = path.resolve(__dirname, 'public');

app.use(express.static(pubPath));


app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));


server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log(`Server running on port ${process.env.PORT}`);

});