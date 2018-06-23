const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes');

const Logger = require('./utils/logger');

const AppMiddleware = require('./middleware/app');

const app = express();

// Add server response to res.body
app.use(AppMiddleware.captureResponseBody);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', routes);

const PORT = 4000;
const onListen = () => Logger.log('🔥 on port: ' + PORT);
const onError = err => {
  Logger.log(err);
  process.exit(1);
};

const server = http.createServer(app);

server.listen(PORT);
server.on('listening', onListen);
server.on('error', onError);
