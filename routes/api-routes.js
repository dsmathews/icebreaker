const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Connection = require('../models/connection')

module.exports = function (app) {
    app.get('/api/user', function (req, res) {
        User.find().then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.json(err);
        })
    })


    app.get('/api/user/:id', function (req, res) {
        User.find({ _id: req.params.id })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post('/api/user', function (req, res) {
        User.create(req.body)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post('/api/quiz', function (req, res) {
        const newEntry = {
            questions: req.body.questions,
            answers: req.body.answers,
            quizMaker: req.body.quizMaker
        }

        Quiz.create(newEntry)
            .then(function (dbQuiz) {
                res.json(dbQuiz);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get('/api/quiz', function (req, res) {
        Quiz.find().then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.json(err);
        })
    })
    app.get('/api/quiz/:id', function (req, res) {
        Quiz.find({ _id: req.params.id })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete('/api/quiz/:id', function (req, res) {
        Quiz.deleteOne({ _id: req.params.id })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post('/api/connection', function (req, res) {
        const newConnection = {
            makerId: req.body.makerId,
            takerId: req.body.takerId,
            score: req.body.score
        }
        Connection.create(newConnection)
        .then(function (dbConnection) {
            res.json(dbConnection);
        })
        .catch(function (err) {
            res.json(err);
        });

    })

    app.get('/api/connection', function (req, res) {
        Connection.find().then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.json(err);
        })
    })

    app.get('/api/connection/:id', function (req, res) {
        Connection.find({ _id: req.params.id })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
}