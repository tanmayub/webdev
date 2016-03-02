/**
 * Created by TanmayPC on 2/20/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"],
                "email": "alice@abc.com"},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"],
                "email": "bob@abc.com"},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"],
                "email": "charlie@abc.com"},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"],
                "email": "dan@abc.com"},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"],
                "email": "ed@abc.com"}
        ]

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByCredentials(username, password, callback) {
            for(var i = 0; i < users.length; i++) {
                if(users[i].username == username && users[i].password == password) {
                    callback(users[i]);
                }
            }
        }
        function findAllUsers(callback) {
            callback(users);

        }
        function createUser(user, callback) {
            user._id = Math.floor(Math.random() * 900) + 100;
            users.push(user);
            callback(user);
        }
        function deleteUserById(userId, callback) {
            var indexToRemove = -1;
            for(var i = 0 ; i < users.length; i++) {
                if(users[i]._id == userId) {
                    indexToRemove = i;
                }
            }

            if(indexToRemove > -1) {
                users.splice(indexToRemove, 1);
            }

            callback(users);
        }
        function updateUser(userId, user, callback) {
            for(var i = 0; i < users.length; i++) {
                if(users[i]._id == userId) {
                    users[i].username = user.username;
                    users[i].password = user.password;
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].email = user.email;

                    callback(users[i]);
                }
            }
        }
    }
})();