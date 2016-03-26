/**
 * Created by sudeep on 3/3/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .factory("CollectionsService", CollectionsService);

    function CollectionsService($q, $http) {

        var api = {
            createCollectionForUser: createCollectionForUser,
            findAllCollectionsForConnection: findAllCollectionsForConnection,
            deleteCollectionById: deleteCollectionById,
            updateCollectionById: updateCollectionById,
            findCollectionById: findCollectionById
        };
        return api;

        function createCollectionForUser(connId, collection) {

            var deferred = $q.defer();
            var url = "/api/project/connection/" + connId + "/collection";
            $http.post(url, collection).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;

        }

        function findAllCollectionsForConnection(connId) {

            var deferred = $q.defer();
            var url = "/api/project/connection/" + connId + "/collection";
            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteCollectionById(collectionId) {
            var deferred = $q.defer();
            var url = "/api/project/collection/" + collectionId;
            $http.delete(url).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function updateCollectionById(collectionId, newCollection) {
            var deferred = $q.defer();
            var url = "/api/project/collection/" + collectionId;
            $http.put(url, newCollection).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findCollectionById (colId) {
            var deferred = $q.defer();
            var url = "/api/project/collection/" + colId;
            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }
    }
})();