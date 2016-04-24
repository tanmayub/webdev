/**
 * Created by sudeep on 3/13/16.
 */
"use strict"

module.exports = function(db, mongoose) {

    var userSchema = require("./user.schema.server.js")(mongoose);

    var userModel = mongoose.model('ProjectUser', userSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
    };
    return api;

    function createUser(user) {

        return userModel.create(user);
    }

    function findUserById(userId) {

        return userModel.findById(userId);
    }

    function findAllUsers() {
        return userModel.find({});
    }

    function updateUserById(userId, user) {

        return userModel.findByIdAndUpdate(userId, user);
    }

    function deleteUserById(userId) {

        return userModel.findByIdAndRemove(userId);
    }

    function findUserByUsername(userName) {

        return userModel.findOne({username: userName});
    }

    function findUserByCredentials(credentials) {

        return userModel.findOne({username: credentials.username, password: credentials.password});
    }

}
