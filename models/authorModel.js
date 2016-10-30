var Sequelize = require('sequelize');

var authorModel = function (sequelize) {
    var author = sequelize.define('author', {
        firstname: {
            type: Sequelize.STRING,
            field: 'firstname' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        lastname: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        }
    }, {
            freezeTableName: true, // Model tableName will be the same as the model name
            createdAt: false, //Ignore the createdAt because I don't wanna have a column in my table for this
            updatedAt: false //Ignore the updatedAt because I don't wanna have a column in my table for this
        });

    return author;
};

module.exports = authorModel;