var authorController = function (Author) {
    var post = function (req, res) {
        Author
            .create(req.body)
            .then(function (author) {
                res.status(201).json(author);
            });
    };

    var get = function (req, res) {
        var query = {
            where: {},
            order: ['id']
        };
        if (req.query.firstname) {
            query.where.firstname = req.query.firstname;
        }
        if (req.query.lastname) {
            query.where.lastname = req.query.lastname;
        }

        Author.all(query)
            .then(function (authors) {
                var returnAuthors = [];
                authors.forEach(function (element, index, array) {
                    var newAuthor = element.toJSON();
                    newAuthor.links = {};
                    newAuthor.links.self = 'http://' + req.headers.host + '/api/authors/' + newAuthor.id;
                    returnAuthors.push(newAuthor);
                })
                res.json(returnAuthors);
            })
            .catch(function (err) {
                res.status(500).send(err);
            });
    };

    var getById = function (req, res) {
        var returnAuthor = req.author.toJSON();

        returnAuthor.links = {};
        returnAuthor.links.filterByFirstname = 'http://' + req.headers.host + '/api/authors/?firstname=' + encodeURIComponent(returnAuthor.firstname);

        res.json(returnAuthor);
    };

    var put = function (req, res) {
        if (req.body.id)
            delete req.body.id;

        req.author.updateAttributes(req.body)
            .then(function (author) {
                res.json(author);
            })
            .catch(function (err) {
                res.status(500).send(err);
            });
    };

    var deleteById = function (req, res) {
        req.author.destroy()
            .then(function () {
                res.status(204).send('Removed');
            }).catch(function (err) {
                res.status(500).send(err);
            });
    };

    return {
        post: post,
        get: get,
        getById: getById,
        put: put,
        delete: deleteById
    };
}

module.exports = authorController;