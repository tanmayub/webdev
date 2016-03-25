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
            getDocumentById: getDocumentById,
            createDocumentProp: createDocumentProp,
            deleteProperty: deleteProperty,
            updateProperty: updateProperty
        };
        return api;

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

        function updateDocumentById(documentId, newDocument) {
            var deferred = $q.defer();
            var url = "/api/project/collection/document/" + documentId;
            $http.put(url, newDocument).success (function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function getAllProperties(documentId, callback) {
            var prop = [];
            var doc = null;
            for (var i = 0; i < documents.length;i++) {
                if (documents[i]._id === documentId) {
                    doc = documents[i];
                    break;
                }
            }

            for(var p in doc) {
                if(p != "_id" && p != "name" && p != "collectionId" && p!= "$$hashKey") {
                    prop.push(p);
                }
            }

            console.log("In Service properties: " + prop);
            callback(prop);
        }

        function getDocumentById(docId, callback) {
            for (var i = 0; i < documents.length;i++) {
                if (documents[i]._id === docId) {
                    callback(documents[i]);
                    break;
                }
            }
        }

        function createDocumentProp(docId, prop, callback) {
            for(var i = 0; i < documents.length; i++) {
                if(documents[i]._id === docId) {
                    documents[i][prop.name] = prop.value;
                    callback(documents[i]);
                    break;
                }
            }
        }

        function deleteProperty(docId, propName, callback) {
            for(var i = 0; i < documents.length; i++) {
                if(documents[i]._id === docId) {
                    delete documents[i][propName];
                    callback(documents[i]);
                    break;
                }
            }
        }

        function updateProperty(docId, prop, callback) {
            var docToBeReturned = null;
            for(var i = 0; i < documents.length; i++) {
                if (documents[i]._id === docId) {
                    documents[i][prop.name] = prop.value;
                    docToBeReturned = documents[i];
                    break;
                }
            }
            callback(docToBeReturned);
        }

    }
})();