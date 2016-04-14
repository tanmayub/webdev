/**
 * Created by TanmayPC on 3/18/2016.
 */
"use strict"

var passport = require('passport');
var LocalStrategy = require('passport-local');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, userModel) {
    var auth = authorized;

    app.post("/api/assignment/register", createUser);
    app.post("/api/assignment/admin/user", createUser);

    app.get("/api/assignment/user/:userId", findAllusers);
    app.get("/api/assignment/admin/user", auth, findAllusers);

    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/admin/user/:id", findUserById);

    app.put("/api/assignment/user/:id", updateUserById);
    app.put("/api/assignment/admin/user/:id", auth, updateUserById);

    app.delete("/api/assignment/user/:id", deleteUserById);
    app.delete("/api/assignment/admin/user/:id", auth, deleteUserById);

    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.get("/api/assignment/loggedin", loggedIn);
    app.post('/api/assignment/logout',logout);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function createUser (req, res) {
        var user = req.body;
        //user._id = parseInt(Math.floor(Math.random()*900) + 100);
        //res.send(userModel.createUser(user));
        //console.log(user);
        userModel.findUserByUsername(user.username)
            .then(function(response) {
                if(response) {
                    res.json(null);
                }
                else {
                    //console.log("creating user");
                    user.password = bcrypt.hashSync(user.password);
                    userModel.createUser(user)
                        // handle model promise
                        .then(
                            // login user if promise resolved
                            function ( doc ) {
                                req.session.currentUser = doc;
                                res.json(doc);
                                //console.log(doc);
                                /*req.login(doc, function(response) {
                                    if(err) {
                                        console.log("login fail");
                                        res.status(400).send(err);
                                    }
                                    else {
                                        console.log("login success");
                                        res.json(response);
                                    }
                                })*/
                            },
                            // send error if promise rejected
                            function ( err ) {
                                res.status(400).send(err);
                            })
                }
            });
        /*userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                })*/;
    }

    function findAllusers (req, res) {
        if(isAdmin(req.user)) {
            userModel.findAllUsers()
                .then(function(doc) {
                        res.json(doc);
                    },
                    function(err) {
                        res.status(400).send(err);
                    });
        }
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > -1) {
            return true;
        }
        else {
            return false;
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        //res.json(userModel.findUserById(userId));

        userModel.findUserById(userId)
            .then(function(doc) {
                //console.log(doc);
                res.json(doc);
            },
            function(err) {
                res.status(400).send(err);
            });
    }

    function login(req, res) {
        var user = req.user;
        //console.log(user);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        //res.json(userModel.findUserByUsername(username));
        userModel.findUserByUsername(username)
            .then(function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var credentials = {username: username, password: password};
        //console.log(credentials);
        /*var loggedUser = userModel.findUserByCredentials(credentials);
        res.json(loggedUser);*/
        userModel.findUserByCredentials(credentials)
            .then(function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        /*var newUser = userModel.updateUserById(userId, user);
        console.log(newUser);
        res.json(newUser);*/
        var oldPassword = user.password;
        //console.log(user);
        userModel.findUserByUsername(user.username)
            .then(function(response) {
                //console.log(response);
                if(oldPassword != response.password && !bcrypt.compareSync(oldPassword, response.password)) {
                    //console.log("password updated");
                    user.password = bcrypt.hashSync(user.password);
                }
                //console.log(user);
                userModel.updateUserById(userId, user)
                    .then(function(doc) {
                            res.json(doc);
                        },
                        function(err) {
                            res.status(400).send(err);
                        });
            });
        /*userModel.updateUserById(userId, user)
            .then(function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });*/
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        /*userModel.deleteUserById(userId);
        res.send(200);*/
        userModel.deleteUserId(userId)
            .then(function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    //passport changes
    function localStrategy(username, password, done) {
        userModel.findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }else {
                        return done(null, false);
                    }
                } ,
                function (err) {
                    if (err) { return done(err); }
                }
            )
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function logout(req,res){
        req.logOut();
        res.send(200);
    }

    function loggedIn(req,res){
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        }
        else {
            next();
        }
    }

}