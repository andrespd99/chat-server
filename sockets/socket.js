const {
    io
} = require('../index');

const {
    verifyJWT
} = require('../helpers/jwt');

const {
    onUserConnected,
    onUserDisconnected
} = require('../controllers/socket');

// Socket messages
io.on('connection', client => {
    console.log('Client connected...');

    const [authenticated, uid] = verifyJWT(client.handshake.headers['x-token']);

    if (!authenticated) {
        console.log('Client could not be authenticated');
        return client.disconnect();
    }

    console.log('Client authenticated...');
    onUserConnected(uid);

    client.on('disconnect', () => {
        onUserDisconnected(uid);
        console.log('Client disconnected!');
    });
    // client.on('emit-message', (payload) => client.broadcast.emit('new-message', payload));

});