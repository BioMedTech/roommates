const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const socketIO = require('socket.io');


//const publicPath = path.join(__dirname, '../public');
const server = http.createServer(app);
const io = socketIO(server);

//app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app;
module.exports = io;