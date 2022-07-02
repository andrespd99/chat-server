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

    // Client connected.
    onUserConnected(uid);

    // Connect client to the room.
    client.join(uid);

    //Listen private-message event
    client.on('private-message', data => {

        io.to(data.to).emit('private-message', data);
        // client.broadcast.to(data.to).emit('private-message', data);
    });

    client.on('disconnect', () => {
        onUserDisconnected(uid);
        console.log('Client disconnected!');
    });
    // client.on('emit-message', (payload) => client.broadcast.emit('new-message', payload));

});