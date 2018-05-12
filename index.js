const Mongoose = require('mongoose');
const F = require('lodash/fp');
const pkg = require('./package.json');

function connect (uri, options) {
    Mongoose.connect(uri, options);
    return Mongoose.connection;
}

function register (server, options) {
    const promise = options.promise;
    if (promise) {
        Mongoose.Promise = global.Promise;
    }

    const uri = options.uri;
    const connectOptions = F.omit(['uri', 'promise'], options);
    if (!uri) {
        throw new Error('`uri` option is required');
    }

    return new Promise((res, rej) => {
        connect(uri, connectOptions)
            .once('error', error => rej(error))
            .on('disconnected', () => connect(uri, connectOptions))
            .once('open', () => {
                res();
            });
    });
};

module.exports = {
    pkg,
    register,
};
