/**
 * Created by sudeep on 2/19/16.
 */

"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q, $rootScope) {

        var service = {

            login: login,

            findUserByUsername: findUserByUsername,

            findAllUsers: findAllUsers,

            register: register,

            createUser: createUser,

            deleteUserById: deleteUserById,

            updateUser: updateUser,

            findUserById: findUserById,

            getCurrentUser: getCurrentUser,

            setCurrentUser: setCurrentUser,

            logout: logout
        };
        return service;

        function login(user) {

            return $http.post("/api/project/login", user);

        }

        function findUserByUsername(username) {

            var deferred = $q.defer();

            var url = "/api/project/admin/user?username=:username";
            url = url.replace(":username", username);

            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findAllUsers() {

            var deferred = $q.defer();

            var url = "/api/project/admin/user";

            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function register(user) {

            var deferred = $q.defer();

            var url = "/api/project/register";

            $http.post(url, user).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function createUser(user) {

            var deferred = $q.defer();

            var url = "/api/project/admin/user";

            $http.post(url, user).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function deleteUserById(userID) {

            var deferred = $q.defer();

            var url = "/api/project/admin/user/:id";
            url = url.replace(":id", userID);

            $http.delete(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function updateUser(userID, user) {

            var deferred = $q.defer();

            var url = "/api/project/admin/user/:id";
            url = url.replace(":id", userID);

            $http.put(url, user).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findUserById(userID) {

            var deferred = $q.defer();

            var url = "/api/project/admin/user/:id";
            url = url.replace(":id", userID);

            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function getCurrentUser() {

            return $http.get("/api/project/user/loggedin");
        }

        function setCurrentUser(user) {

            $rootScope.currentUser = user;
        }

        function logout() {

            return $http.post("/api/project/user/logout")
        }
    }
})();