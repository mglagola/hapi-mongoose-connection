# Hapi Mongoose Connection Plugin

## Install

**NPM**
```bash
$ npm install hapi-mongoose-plugin --save
```

## Usage

```js
const HapiMongoose = require('./middleware/mongoose');
const Promise = require('bluebird');

const mongodbURI = process.env.MONGODB_URI;

const MongooseSetup = {
    register: HapiMongoose,
    options: {
        uri: mongodbURI,
        promise: Promise,
        ...any_mongoose_connection_options_here
    },
};

...

server.register([
    ...
    MongooseSetup,
    ...
], (err) => {
    if (err) throw err;
    ...
});


```

## License

MIT