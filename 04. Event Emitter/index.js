const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter { };

// initialize object
const myEmitter = new MyEmitter();

// add listener for the events
// on is used to add a callback function that's going to be executed when the event is triggered
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    // Emit Event (emit is used to trigger an event)
    myEmitter.emit('log', 'Log Event Emitted!!');
}, 2000);