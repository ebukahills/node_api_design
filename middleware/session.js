const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/node_api');

module.exports = {
  RedisSessionStore: session({
    store: new RedisStore(),
    key: 'asdfasdfsdfasf',
    secret: 'asdfsafafas',
    saveUninitialized: false,
    rolling: true,
    resave: false,
    cookie: {
      maxAge: 60000,
    },
  }),

  //
  MongoSessionStore: session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    key: 'asdfasdfsdfasf',
    secret: 'asdfsafafas',
    saveUninitialized: false,
    rolling: true,
    resave: false,
    cookie: {
      maxAge: 60000,
    },
  }),
};
