var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Sequelize = require('sequelize');

//MongoDB
var db;
if (process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
}
else {
    db = mongoose.connect('mongodb://localhost/bookAPI');
}

//PostgreSQL
var sequelize = new Sequelize('postgres://postgres:admin@localhost/authorapi');

//Models
var Book = require('./models/bookModel');
var Author = require('./models/authorModel')(sequelize);

var server = express();

var port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//Routers
var bookRouter = require('./routes/bookRoutes')(Book);
var authorRouter = require('./routes/authorRoutes')(Author);

server.use('/api/books', bookRouter);
server.use('/api/authors', authorRouter);

server.get('/', function (req, res) {
    res.send('Welcome to my API!')
});

server.listen(port, function () {
    console.log("Gulp is running my API on port : " + port);
});

module.exports = server;