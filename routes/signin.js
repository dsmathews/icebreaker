const User = require('../models/User');
const jwt=require('jsonwebtoken');
const authentication = require('../middleware/authentication');


module.exports = function (app) {

    //getting all users
    app.get('/api/user', function (req, res) {
        User.findAll({}).then(function (user) {
            res.json(user);
        })
    })
    // Getting the user's home page after login
    app.get('/api/user/:id', authentication, function (req, res) {
        User.find({
            where: {
                id:req.params.id
            }
        }).then(resp=>{
            res.json(resp)
        }).catch(err=>{
            res.json(err);
        })
    })
    //creating account
    app.post('/api/user',function(req,res){
        User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        })
        .then(success=>{
            res.json(success)
        }).catch(err=>{
            res.status(500).json(err);
        })
    })
    // hash through encrypted passwords
    app.post('/login', function(req,res){
        console.log(req.body, "this should be our user");
        User.findOne({
            where: {
                username: req.body.username,
            }
        }).then(function (user) {
            if (!user || !user.validatePw(req.body.password)) {
                return res.status(401).json({
                    message: "Incorrect username or password."
                })
            } else {

                console.log(user)

                jwt.sign({
                    username: user.username,
                    id: user.id
                }, process.env.SECRET_KEY, { expiresIn: '30m' }, (err, token) => {
                    res.json({
                        token: token,
                        id: user.id,
                    }).catch(err => {
                        res.json({ err });
                    });
                });
            }

        }).catch(function (err) {
            console.log(`error: ${err}`);
            res.json({ error: err });
        });
    });
    };

    // Login the user
    // Request will contest username and password
    // After comparing with database using bcrypt decryption, response with jwt token
    // If error, response with error object
    app.post(`/api/login`, (req, res) => {
        User.findOne({ username: req.body.username })
            .then(function (data) {
                if (!data) {
                    throw "No such user or bad request format"
                } else {
                    bcrypt.compare(req.body.password, data.password).then(function (res) {
                        if (res) {
                            console.log(req.body.password);
                            console.log(": " + data.password);
                            /*
                            const token = jwt.sign({id: data.id}, appRef.get("secretKey"), { expiresIn: "1h" });
                            res.json({status: "success", message: "Logged in", data: {username: data.username, token: token}});   
                            */
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

