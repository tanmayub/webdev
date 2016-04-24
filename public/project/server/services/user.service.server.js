/**
 * Created by sudeep on 3/13/16.
 */
"use strict"

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

var bcrypt = require("bcrypt-nodejs");


module.exports = function(app, userModel) {

    var auth = authorized;

    //Registers a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/project/register",  register);

    //Creates a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/project/admin/user", auth, createUser);

    //Return logged in user (possibly null)
    app.get("/api/project/user/loggedin", loggedIn);

    //Logout current user
    app.post("/api/project/user/logout", logout);

    //responds with an array of all users
    app.get("/api/project/admin/user", auth,  findAllusers);

    //responds with a single user whose id property is equal to the id path parameter
    app.get("/api/project/admin/user/:id", findUserById);

    //updates an existing user whose id property is equal to the id path parameter.
    // The new properties are set to the values in the user object embedded in the HTTP request.
    // Responds with an array of all users
    app.put("/api/project/admin/user/:id", auth,  updateUserById);

    //removes an existing user whose id property is equal to the id path parameter. Responds with an array of all users
    app.delete("/api/project/admin/user/:id", auth, deleteUserById);

    app.post  ('/api/project/login', passport.authenticate('assignment'), login);

    passport.use('assignment', new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    
    passport.deserializeUser(deserializeUser);


    function createUser(req, res) {

        var newUser = req.body;

        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");

        } else {

            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(

                function(user){

                    // if the user does not already exist
                    if(user == null) {

                        newUser.password = bcrypt.hashSync(newUser.password);
                        // create a new user
                        return userModel.createUser(newUser)

                            .then(

                                // fetch all the users
                                function(){

                                    return userModel.findAllUsers();
                                },

                                function(err){

                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {

                        return userModel.findAllUsers();
                    }
                },

                function(err){

                    res.status(400).send(err);
                }
            )
            .then(

                function(users){

                    res.json(users);
                },
                function(){

                    res.status(400).send(err);
                }
            )
    }

    function register (req, res) {

        var newUser = req.body;
        newUser.roles = ['student'];

        userModel.findUserByUsername(newUser.username)
            .then(
                
                function (user) {

                    if(user) {
                        res.json(null);
                    }
                    else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                }
            )
        
            .then(
                
                function (user) {

                    if(user) {

                        req.login(user,function (err) {
                            
                            if(err) {
                                res.status(400).send(err);

                            } else {
                                res.json(user);
                            }
                            
                        });
                    }
                    
                },
                
                function (err) {

                    res.status(400).send(err);
                    
                }
            );
    }

    function findAllusers (req, res) {

        if(req.query.username && req.query.password) {

            findUserByCredentials(req, res);

        }else if (req.query.username) {

            findUserByUsername(req, res);

        }else {

            if(isAdmin(req.user)) {

                userModel.findAllUsers()
                
                    .then(
                        
                        function (users) {

                            var normalUsers = [];

                            for(var i in users) {
                                if(users[i].roles.indexOf('admin') === -1) {
                                    normalUsers.push(users[i]);
                                }
                            }

                            res.json(normalUsers);
                            
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

    function findUserById(req, res) {

        var userId = req.params.id;

        userModel.findUserById(userId)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {

        var username = req.query.username;

        userModel.findUserByUsername(username)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        var credentials = {username: username, password: password};

        var currentUser = userModel.findUserByCredentials(credentials)

            .then(

                function (doc) {

                    req.session.currentUser = doc;

                    res.json(doc);

                },

                function (err) {

                    res.status(400).send(err);
                }
            )
    }

    function loggedIn(req, res) {

        res.send(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res) {

        req.logOut();
        res.send(200);
    }

    function updateUserById(req, res) {

        var userId = req.params.id;

        var user = req.body;

        if(!isAdmin(req.user)) {
            delete user.roles;
        }

        user.password = bcrypt.hashSync(user.password);
        
        userModel.updateUserById(userId, user)

            .then(

                function (doc) {

                    if(!doc) {

                        res.status(400).send('Error');
                    } else {
                        
                        res.status(200).send('Updated');
                    }
                }
            );
    }

    function deleteUserById(req, res) {

        var userId = req.params.id;

        if(isAdmin(req.user)) {

            userModel.deleteUserById(userId)

                .then(
                    function (doc) {

                        if (doc) {

                            res.status(200).send('Deleted');
                        }
                        else {

                            res.status(400).send(err);
                        }
                    }
                );
        }else {
            res.status(403);
        }
    }
    
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

    function login(req, res) {

        var user = req.user;
        res.json(user);
    }

    function isAdmin(user) {

        if(user.roles.indexOf("admin") >= 0) {

            return true;
        }

        return false;
    }

    function authorized (req, res, next) {

        if (!req.isAuthenticated()) {

            res.send(401);

        } else {

            next();
        }
    }


}
