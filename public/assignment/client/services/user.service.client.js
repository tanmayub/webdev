"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q, $rootScope) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            getLoggedUser: getLoggedUser,
            setLoggedUser: setLoggedUser,
            logout: logout
        };
        return api;

        function findUserByCredentials(username, password) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user?username=" + username + "&password=" + password).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();
            var url = "/api/assignment/user?username=:username";
            url = url.replace(":username", username);
            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findAllUsers(callback) {
            var deferred = $q.defer();
            var url = "/api/assignment/user";
            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            var url = "/api/assignment/user";
            $http.post(url, user).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteUserById(userID) {
            var deferred = $q.defer();
            var url = "/api/assignment/user/:id";
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

        function findUserById(userID) {
            var deferred = $q.defer();
            var url = "/api/assignment/user/:id";
            url = url.replace(":id", userID);
            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function getLoggedUser() {
            return $http.get("/api/assignment/user/loggedinUser");
        }

        function setLoggedUser(user) {
            $rootScope.currentUser = user;
        }

        function logout() {
            return $http.post("/api/assignment/user/logout")
        }
    }
})();