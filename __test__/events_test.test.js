
"use strict";
require('dotenv').config()
const PORT = process.env.PORT || 5050;
const hub = require("socket.io")(PORT);
require("../hub/fire-events");

require("../hub/hub");

describe("socket event test", () => {
    let consoleSpy;
    beforeEach(() => {
        consoleSpy = null;
        consoleSpy = jest.spyOn(console, "log").mockImplementation();
    });

    afterAll(() => setTimeout(() => process.exit(), 0));
    let order = {
        store: '1-206-flowers',
        orderId: '455c33a3-9a06-4ba1-ba85-cb781126fbf5',
        customer: 'Jason Padberg',
        address: 'Goyetteborough, NV'
    }
    test("pick up test", async () => {
        expect(hub.emit("pickup", order)).toEqual(true);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled()
    });
    test("in-transit test", async () => {
        expect(hub.emit("inTtransit", order)).toEqual(true);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled()
    });

    test("delivered test", async () => {
        expect(hub.emit("delivered", order)).toEqual(true);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled()
    });
})
