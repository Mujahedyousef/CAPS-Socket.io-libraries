"use strict";
require('dotenv').config()

const PORT = process.env.PORT || 5050;
const io = require('socket.io')(PORT);

// const io = socket(port);
io.on('connection', (socket) => {
    console.log('CONNECTED with hub ', socket.id);
    //gobal 
    socket.on('start_fire', () => {
        io.emit('createOrder');
    })

    socket.on('hub_Pickup', payload => {
        io.emit('pickup', payload)
    })
    socket.on('hub_inTtransit', payload => {
        io.emit('inTtransit', payload)
    })
    socket.on('hub_delivered', payload => {
        io.emit('delivered', payload)
    })
    socket.on('hub_Notification', payload => {
        io.emit('notification', payload)
    })
    socket.on('print_stauts_order', payload => {
        console.log(payload);
    })
});
