"use strict";

const io = require('socket.io-client');
require('dotenv').config()

const PORT = process.env.PORT || 5050;

const host = `http://localhost:${PORT}`;
const hubConnection = io.connect(host);
setInterval(() => {
    hubConnection.emit("start_fire");
}, 9000)




