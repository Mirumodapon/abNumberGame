const express = require('express');
const http = require('http');
const session = require('express-session');

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

  initializeRouter = () => {};
  initializeMiddleware = () => {
    this.app.use(express.json());
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
