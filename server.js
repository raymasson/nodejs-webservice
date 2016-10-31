var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Sequelize = require('sequelize'),
    config = require('config');

//MongoDB
var db;
if (process.env.ENV == 'Test') {
    if (config.has('MongoDBUrl_Test')) {
        db = mongoose.connect(config.get('MongoDBUrl_Test'));
    };
}
else {
    db = mongoose.connect(config.get('MongoDBUrl'));
}

//PostgreSQL
var sequelize = new Sequelize(config.get('PostgreSqlDBUrl'));

//Models
var Book = require('./models/bookModel');
var Author = require('./models/authorModel')(sequelize);

var server = express();

var port = process.env.npm_package_config_port || process.env.PORT || 3000;

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
    console.log("API running on port : " + port);
});

module.exports = server;