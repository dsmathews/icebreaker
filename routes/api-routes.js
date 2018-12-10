const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Connection = require('../models/connection')
var jwt = require('jsonwebtoken');

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
        const userId = req.userId;
        console.log("Inside /api/quiz:", userId);
        const newEntry = {
            title: req.body.title,
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
    // After user creates account this is route to login
    //uses validation for the pw to connect the same passwords
    app.post('/api/login', function (req, res) {
        console.log(req.body, "this should be our user");
        User.findOne({
            email: req.body.email,
        }).then(function (user) {
            console.log(user, "this should be the user")
            if (!user || !user.validatePw(req.body.password)) {
                return res.status(401).json({
                    message: "Incorrect email or password."
                })
            } else {

                ;

                jwt.sign({
                    email: user.email,
                    id: user._id
                }, process.env.SK, { expiresIn: '30m' }, (err, token) => {
                    res.json({
                        token: token,
                        id: user._id,
                    });
                });
            }

        }).catch(function (err) {
            console.log(`error: ${err}`);
            res.status(500).json({ error: err });
        });
    });

    // Login the user
    // Request will contest email and password
    // After comparing with database using bcrypt decryption, response with jwt token
    // If error, response with error object
    app.post(`/api/login`, (req, res) => {
        User.findOne({ email: req.body.email })
            .then(function (data) {
                if (!data) {
                    throw "No such user or bad request format"
                } else {
                    bcrypt.compare(req.body.password, data.password).then(function (res) {
                        if (res) {
                            console.log(req.body.password);
                            console.log(": " + data.password);
                        } else {
                            throw "Wrong password";
                        }
                    })
                }
            })
            .catch(function (err) {
                res.json({ status: "error", message: err });
            });
    });




}
