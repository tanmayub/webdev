/**
 * Created by TanmayPC on 3/18/2016.
 */
//var users = require("./user.mock.json");

var q = require("q");

module.exports = function(db, mongoose) {

    //console.log(mongoose);
    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('user', UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        updateUserById: updateUserById,
        deleteUserId: deleteUserId,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(user) {
        /*users.push(user);
        return users;*/
        var deferred = q.defer();

        UserModel.create(user, function (err, doc) {
            //console.log("create: " + doc);
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        /*for (var u in users) {
            if(users[u]._id === userId) {
                console.log(users[u]);
                return users[u];
            }
        }
        return null;*/

        var deferred = q.defer();
        UserModel.find({_id: userId}, function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc[0]);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        return UserModel.find(function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUserById(userId, user) {
        /*user._id = userId;
        for (var u in users) {
            if(users[u]._id === userId) {
                users[u] = user;
                return users[u];
            }
        }
        return users;*/
        var deferred = q.defer();
        //console.log(userId);
        delete user._id;
        if(!Array.isArray(user.email)) {
            user.email = user.email.split(",");
        }
        if(!Array.isArray(user.phone)) {
            user.phone = user.phone.split(",");
        }
        UserModel.update({_id: userId}, user, function(err, doc) {
            if(err) {
                //console.log(err);
                deferred.reject(err);
            }
            else {
                //console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteUserId(userId) {
        /*for (var u in users) {
            if (users[u]._id === userId) {
                users.splice(u,1);
                break;
            }
        }
        return users;*/

        var deferred = q.defer();
        //console.log(userId);
        UserModel.remove({_id: userId}, function(err, doc) {
            if(err) {
                //console.log(err);
                deferred.reject(err);
            }
            else {
                //console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(userName) {
        /*for (var u in users) {
            if (users[u].username === userName) {
                return users[u];
            }
        }

        return null;*/

        var deferred = q.defer();
        UserModel.findOne({username: userName}, function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var usr = null;
        /*for (var u in users) {
            if (users[u].username === credentials.username
                && users[u].password === credentials.password) {
                console.log("found");
                usr = users[u];
                break;
            }
        }
        return usr;*/
        var deferred = q.defer();
        UserModel.findOne({username: credentials.username, password: credentials.password},
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
        });
        return deferred.promise;
    }
}