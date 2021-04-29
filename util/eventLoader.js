const req = event => require(`../events/${event}`)
require('events').EventEmitter.defaultMaxListeners = 15;
//FK XD
module.exports = client => {//FK XD
    client.on('ready',() => req('ready')(client))
    client.on('message',req('message'))
}
