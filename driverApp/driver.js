"use strict";

const io = require('socket.io-client');

require('dotenv').config()

const PORT = process.env.PORT ||5050;

const host =`http://localhost:${PORT}`; //Heroku-link

const hubConnection = io.connect(host);

const pickup = (payload) => {
    let EVENT = {
        event: "pickup",
        time: new Date().toString(),
        payload: payload
    }

    hubConnection.emit('print_stauts_order', EVENT);
    setTimeout(() => {
        hubConnection.emit('hub_inTtransit', EVENT.payload);
    }, 1000);
}


const inTtransit = (payload) => {


    let statusOrder = `DRIVER: picked up  ${payload.orderId}`;
    let EVENT = {
        event: 'in-transit',
        time: new Date().toString(),
        payload: payload
    }
    console.log(statusOrder);
    hubConnection.emit('print_stauts_order', statusOrder);
    hubConnection.emit('print_stauts_order', EVENT);
    setTimeout(() => {
        hubConnection.emit('hub_delivered', EVENT.payload);
    }, 3000);


}

const delivered = (payload) => {

    let EVENT = {
        event: 'delivered',
        time: new Date().toString(),
        payload: payload
    }
    let statusOrder = `DRIVER: delivered up  ${payload.orderId}`;
    console.log(statusOrder);
    hubConnection.emit('print_stauts_order', statusOrder);
    hubConnection.emit('print_stauts_order', EVENT);
    hubConnection.emit('hub_Notification', payload);
}
hubConnection.on('pickup', pickup);
hubConnection.on('inTtransit', inTtransit);
hubConnection.on('delivered', delivered);