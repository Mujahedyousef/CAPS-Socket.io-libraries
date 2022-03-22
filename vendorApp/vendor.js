"use strict";

'use strict';
const { faker } = require('@faker-js/faker');
require('dotenv').config()

const PORT = process.env.PORT ||5050;
const io = require('socket.io-client');

const host =`http://localhost:${PORT}`; //Heroku-link

const hubConnection = io.connect(host);


const createOrder = () => {
    let order = {
        store: '1-206-flowers',
        orderId: faker.random.uuid(),
        customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
        address: `${faker.address.city()}, ${faker.address.stateAbbr()}`
    }
    let statusOrder = `(===New Order===)`;

    hubConnection.emit('hub_Pickup', order);
    hubConnection.emit('print_stauts_order', statusOrder);
    hubConnection.emit('print_stauts_order', order);

}


const notification = (payload) => {

    console.log(`vendor :Thank you for delivering ${payload.orderId}`);


}
//listner
hubConnection.on('createOrder', createOrder);
hubConnection.on('notification', notification);
