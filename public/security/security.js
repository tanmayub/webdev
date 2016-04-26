/**
 * Created by TanmayPC on 4/26/2016.
 */

"use strict";
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");

module.exports = function(app, assignmentUserModel, projectUserModel) {

    passport.use('assignment', new LocalStrategy(assignmentLocalStrategy));
    passport.use('project', new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var auth = authorized;

    //assignment
    app.post("/api/assignment/register", createUser);
    app.post("/api/assignment/admin/user", createUser);

    app.get("/api/assignment/user/:userId", assignmentFindAllusers);
    app.get("/api/assignment/admin/user", auth, assignmentFindAllusers);

    app.put("/api/assignment/user/:id", assignmentUpdateUserById);
    app.put("/api/assignment/admin/user/:id", auth, assignmentUpdateUserById);

    app.delete("/api/assignment/user/:id", assignmentDeleteUserById);
    app.delete("/api/assignment/admin/user/:id", auth, assignmentDeleteUserById);

    app.get("/api/assignment/user/:username", assignmentFindUserByUsername);

    app.post('/api/assignment/login', passport.authenticate('assignment'), login);
    app.get("/api/assignment/loggedin", assignmentLoggedin);
    app.post('/api/assignment/logout',logout);


    //project
    app.post  ('/api/project/login',    passport.authenticate('project'), login);
    app.post  ('/api/project/user/logout',   logout);
    app.get   ('/api/project/user/loggedin', projectLoggedin);
    app.post  ('/api/project/register', createUser);
    //responds with an array of all users
    app.get("/api/project/admin/user", auth,  findAllusers);


    function assignmentLocalStrategy(username, password, done) {
        assignmentUserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function projectLocalStrategy(username, password, done) {
        projectUserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    function createUser (req, res) {
        var user = req.body;
        //user._id = parseInt(Math.floor(Math.random()*900) + 100);
        //res.send(userModel.createUser(user));
        //console.log(user);
        if(user.type === 'assignment') {
            assignmentUserModel.findUserByUsername(user.username)
                .then(function (response) {
                    if (response) {
                        res.json(null);
                    }
                    else {
                        //console.log("creating user");
                        user.password = bcrypt.hashSync(user.password);
                        assignmentUserModel.createUser(user)
                            // handle model promise
                            .then(
                                // login user if promise resolved
                                function (doc) {
                                    if (doc) {
                                        req.session.currentUser = doc;
                                        //res.json(doc);
                                        //console.log(doc);
                                        req.login(doc, function (err) {
                                            if (err) {
                                                res.status(400).send(err);
                                            } else {
                                                res.json(doc);
                                            }
                                        });
                                    }
                                },
                                // send error if promise rejected
                                function (err) {
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
             });*/
        }
        else {
            return projectUserModel.findUserByUsername(user.username)
                .then(
                    function (nuser) {
                        if(nuser) {
                            res.json(null);
                        }
                        else {
                            user.password = bcrypt.hashSync(user.password);
                            return projectUserModel.createUser(user);
                        }
                    }
                )
                .then(
                    function (nuser) {
                        if(nuser) {
                            req.login(nuser,function (err) {
                                if(err) {
                                    res.status(400).send(err);
                                } else {
                                    res.json(nuser);
                                }
                            });
                        }
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function assignmentFindAllusers (req, res) {
        if(isAdmin(req.user)) {
            assignmentUserModel.findAllUsers()
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

    function login(req, res) {
        var user = req.user;
        //console.log(user);
        res.json(user);
    }

    function assignmentFindUserByUsername(req, res) {
        var username = req.params.username;
        console.log(username);
        //res.json(userModel.findUserByUsername(username));
        assignmentUserModel.findUserByUsername(username)
            .then(function(doc) {
                    console.log(doc);
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
        assignmentUserModel.findUserByCredentials(credentials)
            .then(function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function assignmentUpdateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        /*var newUser = userModel.updateUserById(userId, user);
         console.log(newUser);
         res.json(newUser);*/
        var oldPassword = user.password;
        //console.log(user);
        assignmentUserModel.findUserByUsername(user.username)
            .then(function(response) {
                //console.log(response);
                if(oldPassword != response.password && !bcrypt.compareSync(oldPassword, response.password)) {
                    //console.log("password updated");
                    user.password = bcrypt.hashSync(user.password);
                }
                //console.log(user);
                assignmentUserModel.updateUserById(userId, user)
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

    function assignmentDeleteUserById(req, res) {
        var userId = req.params.id;
        /*userModel.deleteUserById(userId);
         res.send(200);*/
        assignmentUserModel.deleteUserId(userId)
            .then(function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        //console.log(user);
        if(user.type == 'assignment') {
            assignmentUserModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
        else if(user.type == 'project') {
            projectUserModel
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
    }

    function logout(req,res){
        req.logOut();
        res.send(200);
    }

    function assignmentLoggedin(req, res) {
        res.send(req.isAuthenticated() && req.user.type === "assignment" ? req.user : null);
    }

    function projectLoggedin(req, res) {
        res.send(req.isAuthenticated() && req.user.type === "project" ? req.user : null);
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        }
        else {
            next();
        }
    }

    function findAllusers (req, res) {
        if(req.query.username && req.query.password) {
            findUserByCredentials(req, res);
        }else if (req.query.username) {
            findUserByUsername(req, res);
        }else {

            if(isAdmin(req.user)) {
                projectUserModel.findAllUsers()
                    .then(
                        function (users) {
                            /*var normalUsers = [];

                             for(var i in users) {
                             if(users[i].roles.indexOf('admin') === -1) {
                             normalUsers.push(users[i]);
                             }
                             }*/
                            res.json(users);
                        },
                        function (err) {
                            res.status(400);
                        }
                    );

            }else {
                res.status(403);
            }
        }
    }
}