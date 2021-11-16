const EventEmitter = require("events");
class BareEmitter extends EventEmitter {}
const chat = new BareEmitter();
module.exports = { chat };
