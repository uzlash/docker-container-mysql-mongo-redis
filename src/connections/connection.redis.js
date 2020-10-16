const redis = require('redis');
const configs = require('../configs').redisDb

module.exports = () => {
    let client = redis.createClient(configs.port, configs.host);
    client.on('ready', () => {
        console.log('We are connected to  Redis');
    });
    client.on('error', (err) => {
        console.log('Error connecting to', err);
    });
    return client;
}