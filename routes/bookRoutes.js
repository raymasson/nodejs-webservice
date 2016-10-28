var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();

    var bookController = require('../controllers/bookController')(Book);

    bookRouter.route('/')
        .get(bookController.get)
        .post(bookController.post);

    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err)
                res.status(500).send(err);
            else if (book) {
                req.book = book;
                next();
            }
            else {
                res.status(404).send('No book found');
            }
        })
    });
    
    bookRouter.route('/:bookId')
        .get(bookController.getById)
        .put(bookController.put)
        .patch(bookController.patch)
        .delete(bookController.delete);

    return bookRouter;
}

module.exports = routes;