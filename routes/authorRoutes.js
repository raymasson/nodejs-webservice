var express = require('express');

var routes = function (Author) {
    var authorRouter = express.Router();

    var authorController = require('../controllers/authorController')(Author);

    authorRouter.route('/')
        .get(authorController.get)
        .post(authorController.post);

    authorRouter.use('/:authorId', function (req, res, next) {
        Author.find({
            where: {
                id: req.params.authorId
            }
        })
            .then(function (author) {
                if (author) {
                    req.author = author;
                    next();
                }
                else {
                    res.status(404).send('No author found');
                }
            })
            .catch(function (err) {
                res.status(500).send(err);
            });
    });

    authorRouter.route('/:authorId')
        .get(authorController.getById)
        .put(authorController.put)
        .delete(authorController.delete);

    return authorRouter;
}

module.exports = routes;