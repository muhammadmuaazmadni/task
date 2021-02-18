var express = require("express");
var bcrypt = require('bcrypt-inzi');
var jwt = require('jsonwebtoken');
var { userModel } = require("../dbrepo/models");
var { SERVER_SECRET } = require("../core/app");
var api = express.Router();

api.post("/signup", (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.phone) {
        res.status(403).send(`
            please send name, email, passwod and phone in json body.
            e.g:
            {
                "name": "abdul",
                "email": "abdul@gmail.com",
                "password": "abc",
                "phone": "03001234567",
            }`);
        return;
    }
    userModel.findOne({ email: req.body.email }, function (err, doc) {
        if (!err && !doc) {
            bcrypt.stringToHash(req.body.password).then(function (hash) {
                var newUser = new userModel({
                    "name": req.body.name,
                    "email": req.body.email,
                    "password": hash,
                    "phone": req.body.phone,
                });
                newUser.save((err, data) => {
                    // console.log(data);
                    if (!err) {
                        res.send({
                            message: "Signup Successfuly",
                            status: 200,
                            data: data
                        });
                    }
                    else {
                        console.log(err);
                        res.send({
                            message: "User create error, " + err,
                            status: 500
                        });
                    }
                });
            });
        }
        else if (err) {
            res.send({
                message: "DB Error" + err,
                status: 500
            });
        }
        else {
            res.send({
                message: "User already exist!",
                status: 409
            });
        }
    })
});

api.post("/validemail", (req, res, next) => {
    if (!req.body.email) {
        res.status(403).send(`
            please send name, email, passwod and phone in json body.
            e.g:
            {
                "name": "abdul",
                "email": "abdul@gmail.com",
                "password": "abc",
                "phone": "03001234567",
            }`);
        return;
    }
    userModel.findOne({ email: req.body.email }, function (err, doc) {
        if (!err) {
            if (doc) {
                res.send({
                    status: 200,
                    isFound: true
                })
            }
            else {
                res.send({
                    status: 200,
                    isFound: false
                })
            }
        }
        else {
            res.send({
                status: 500
            })
        }
    });
});

api.post("/login", (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.send(`
            please send email and passwod in json body.
            e.g:
            {
                "email": "abdul@gmail.com",
                "password": "abc",
            }`)
        // return;
    }

    userModel.findOne({ email: req.body.email }, function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "An error occured: " + JSON.stringify(err)
            });
        }
        else if (data) {
            console.log(req.body.email);
            bcrypt.varifyHash(req.body.password, data.password).then(isMatched => {
                if (isMatched) {
                    console.log("Matched");

                    let token = jwt.sign({
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                    }, SERVER_SECRET)

                    res.cookie('jToken', token, {
                        maxAge: 86_400_000,
                        httpOnly: true
                    });

                    res.send({
                        message: "Login Success",
                        status: 200,
                        user: {
                            name: data.name,
                            email: data.email,
                            phone: data.phone,
                        },
                    });
                }
                else {
                    console.log("Password not matched");
                    res.send({
                        message: "Incorrect Password",
                        status: 401
                    });
                }
            }).catch(e => {
                console.log("Error: ", e)
            });
        }
        else {
            res.send({
                message: "User not found",
                status: 403
            });
        }
    });
});

module.exports = api;