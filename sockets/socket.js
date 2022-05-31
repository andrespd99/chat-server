const {
    io
} = require('../index');
// Socket messages
io.on('connection', client => {
    console.log('Client connected...');

    client.on('disconnect', () => {
        console.log('Client disconnected!');
    });
    // client.on('emit-message', (payload) => client.broadcast.emit('new-message', payload));

});