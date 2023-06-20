const express = require('express');
const http = require('http');
const session = require('express-session');
const cors = require('cors');

class App {
  constructor({ port }) {
    this.port = port && 3000;
    this.app = express();
    this.server = http.createServer(this.app);

    this.initializeMiddleware();
    this.initializeRouter();
  }

  listen = () =>
    void this.server.listen(
      this.port,
      () => void console.log(`Server started on port ${this.port}...`)
    );

  initializeRouter = () => {
    this.app.use('/api/signal', require('./api/signalGame'));
    this.app.use('/', express.static('src/frontend'));
  };

  initializeMiddleware = () => {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: process.env.CORS_ORIGIN
      })
    );
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET ?? '',
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: { maxAge: 60 * 60 * 1000, httpOnly: true }
      })
    );
  };
}

module.exports = App;
