'use strict';

const Mongoose = require('mongoose');
const omit = require('lodash/omit');

function connect (uri, options) {
    return Mongoose.connect(uri, options).connection;
}

exports.register = function (server, options, next) {
    const promise = options.promise;
    if (promise) {
        Mongoose.Promise = global.Promise;
    }

    const uri = options.uri;
    const connectOptions = omit(options, ['uri', 'promise']);
    if (!uri) {
        return next(new Error('`uri` option is required'));
    }

    connect(uri, connectOptions)
        .once('error', next)
        .on('disconnected', () => connect(uri, connectOptions))
        .once('open', () => {
            next();
        });
};

exports.register.attributes = {
    name: 'Mongoose',
};
