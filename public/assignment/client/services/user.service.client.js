"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q, $rootScope) {

        var api = {
            //findUserByCredentials: findUserByCredentials,
            login: login,
            findAllUsers: findAllUsers,
            findAllUsersForAdmin: findAllUsersForAdmin,
            createUser: createUser,
            createUserForAdmin: createUserForAdmin,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            updateUserForAdmin: updateUserForAdmin,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            setLoggedUser: setLoggedUser,
            logout: logout
        };
        return api;

        function login(user) {
            /*var deferred = $q.defer();

            $http.get("/api/assignment/user?username=" + username + "&password=" + password).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;*/

            /*var deferred = $q.defer();

            $http.post("/api/assignment/login", user).success(function(response) {
                deferred.resolve(response);
            });

            return deferred.promise;*/

            //console.log(user);
            return $http.post("/api/assignment/login", user);
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();
            var url = "/api/assignment/user/:username";
            url = url.replace(":username", username);
            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findAllUsers(user, callback) {
            var deferred = $q.defer();
            var url = "/api/assignment/user/:userId";
            url = url.replace(":userId", user._id);
            //console.log(user);
            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findAllUsersForAdmin(user, callback) {
            var deferred = $q.defer();
            var url = "/api/assignment/admin/user";
            //console.log(user);
            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            var url = "/api/assignment/register";

            user.type = "assignment";

            $http.post(url, user).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function createUserForAdmin(user) {
            var deferred = $q.defer();
            var url = "/api/assignment/admin/user";

            user.type = "assignment";

            $http.post(url, user).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteUserById(userID) {
            var deferred = $q.defer();
            var url = "/api/assignment/admin/user/:id";
            url = url.replace(":id", userID);
            $http.delete(url).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function updateUser(userID, user) {
            var deferred = $q.defer();
            var url = "/api/assignment/user/:id";
            url = url.replace(":id", userID);
            $http.put(url, user).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function updateUserForAdmin(userID, user) {
            var deferred = $q.defer();
            var url = "/api/assignment/admin/user/:id";
            url = url.replace(":id", userID);
            $http.put(url, user).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findUserById(userID) {
            var deferred = $q.defer();
            var url = "/api/assignment/user/:id";
            url = url.replace(":id", userID);
            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function setLoggedUser(user) {
            $rootScope.currentUser = user;
        }

        function logout() {
            return $http.post("/api/assignment/logout")
        }
    }
})();