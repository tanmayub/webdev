/**
 * Created by TanmayPC on 2/20/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService() {
        var $rootScope = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ]

        var api = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByUsernameAndPassword(username, password, callback) {
            for(var i = 0; i < $rootScope.length; i++) {
                if($rootScope[i].username == username && $rootScope[i].password == password) {
                    callback = $rootScope[i];
                }
            }
        }
        function findAllUsers(callback) {
            callback = $rootScope;
        }
        function createUser(user, callback) {

        }
        function deleteUserById(userId, callback) {

        }
        function updateUser(userId, user, callback) {

        }
    }
})();