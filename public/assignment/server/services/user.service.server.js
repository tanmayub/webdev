/**
 * Created by TanmayPC on 3/18/2016.
 */
"use strict"

module.exports = function(app, userModel) {
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllusers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser (req, res) {
        var user = req.body;
        //user._id = parseInt(Math.floor(Math.random()*900) + 100);
        //res.send(userModel.createUser(user));
        userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    //console.log(doc);
                    req.session.currentUser = doc;
                    //console.log("session: " + req.session.currentUser);
                    //console.log("user: " + user);
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllusers (req, res) {
        if(req.query.username && req.query.password) {
            findUserByCredentials(req, res);
        }
        else if (req.query.username) {
            findUserByUsername(req, res);
        }
        else {
            res.json(userModel.findAllUsers());
        }
    }

    function findUserById(req, res) {
        var userId = parseInt(req.params.id);
        res.json(userModel.findUserById(userId));
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        res.json(userModel.findUserByUsername(username));
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var credentials = {username: username, password: password};
        //console.log(credentials);
        var loggedUser = userModel.findUserByCredentials(credentials);
        res.json(loggedUser);
    }

    function updateUserById(req, res) {
        var userId = parseInt(req.params.id);
        var user = req.body;
        var newUser = userModel.updateUserById(userId, user);
        console.log(newUser);
        res.json(newUser);
    }

    function deleteUserById(req, res) {
        var userId = parseInt(req.params.id);
        userModel.deleteUserById(userId);
        res.send(200);
    }
}