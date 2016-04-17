/**
 * Created by sudeep on 3/3/16.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("DocumentsService", documentsService);

    function documentsService($q, $http) {

        var api = {
            createDocumentForCollection: createDocumentForCollection,
            findAllDocumentsForCollection: findAllDocumentsForCollection,
            findDocumentById: findDocumentById,
            deleteDocumentById: deleteDocumentById,
            updateDocumentById: updateDocumentById,

            getProperties: getAllProperties,
            createDocumentProp: createDocumentProp,
            deleteProperty: deleteProperty,
            updateProperty: updateProperty,

            configCollection: configCollection
        };
        return api;

        function configCollection(connId, collectionName) {
            var deferred = $q.defer();
            var url = "/api/project/connection/" + connId + "/collection/" + collectionName + "/config";
            $http.get(url).success (function (response) {

                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function createDocumentForCollection(collectionId, document) {

            var deferred = $q.defer();
            var url = "/api/project/collection/" + collectionId + "/document";
            $http.post(url, document).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findAllDocumentsForCollection(collectionId) {

            var deferred = $q.defer();
            var url = "/api/project/collection/" + collectionId + "/document";
            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findDocumentById(documentId) {

            var deferred = $q.defer();
            var url = "/api/project/collection/document/" + documentId;
            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteDocumentById(documentId) {

            var deferred = $q.defer();
            var url = "/api/project/collection/document/" + documentId;
            $http.delete(url).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function updateDocumentById(newDocument) {

            var deferred = $q.defer();
            var url = "/api/project/collection/document/" + newDocument._id;
            $http.put(url, newDocument).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function getAllProperties(documentId) {

            var deferred = $q.defer();

            var url = "/api/project/document/:documentId/data";
            url = url.replace(":documentId", documentId);

            $http.get(url).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }


        function createDocumentProp(docId, prop) {

            var deferred = $q.defer();

            var url = "/api/project/document/:documentId/data";
            url = url.replace(":documentId", docId);

            $http.post(url, prop).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function deleteProperty(docId, propName, callback) {

            var deferred = $q.defer();

            var url = "/api/project/document/:documentId/data/:name";
            url = url.replace(":documentId", docId);
            url = url.replace(":name", propName);

            $http.delete(url).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;

        }

        function updateProperty(docId, prop) {

            var deferred = $q.defer();

            var url = "/api/project/document/:documentId/data";
            url = url.replace(":documentId", docId);

            $http.put(url, prop).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;

        }

    }
})();