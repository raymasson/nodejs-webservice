var should = require('should'),
    request = require('supertest'),
    server = require('../server.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(server);

describe('Book CRUD Test', function () {
    it('Should allow a book to be posted and return a read and _id', function (done) {
        var bookPost = {
            title: 'new book',
            author: 'Ray',
            genre: 'Fiction'
        };

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end(function (err, results) {
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            });
    });

    afterEach(function (done) {
        Book.remove().exec();
        done();
    });
});