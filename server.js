var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var server = express();

var port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')(Book);

server.use('/api/books', bookRouter);

server.get('/', function (req, res) {
    res.send('Welcome to my API!')
});

server.listen(port, function () {
    console.log("Gulp is running my API on port : " + port);
});