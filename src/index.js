require('dotenv').config();

const App = require('./app');
const app = new App({ port: process.env.PORT });

app.listen();
