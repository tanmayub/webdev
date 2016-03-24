/**
 * Created by sudeep on 3/3/16.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("DocumentsService", documentsService);

    var documents = [
        {
            _id: 212,
            name: "Mydoc",
            collectionId: 12143,
            movieName: "Avatar",
            director: "James Cameron",
            year: 2000
        },

        {
            _id: 213,
            name: "MyDoc2",
            collectionId: 12144,
            movieName: "Deadpool",
            director: "Ryan Reynolds",
            year: 2016
        }
    ];

    function documentsService() {

        var api = {
            createDocumentForCollection: createDocumentForCollection,
            findAllDocumentsForCollection: findAllDocumentsForCollection,
            deleteDocumentById: deleteDocumentById,
            updateDocumentById: updateDocumentById,

            getProperties: getAllProperties,
            getDocumentById: getDocumentById,
            createDocumentProp: createDocumentProp,
            deleteProperty: deleteProperty,
            updateProperty: updateProperty
        };
        return api;

        function createDocumentForCollection(collectionId, document, callback) {
            document._id = Math.floor(Math.random() * 900) + 100;
            document.collectionId = collectionId;
            documents.push(document);
            console.log(documents);
            callback(document);
        }

        function findAllDocumentsForCollection(collectionId, callback) {
            var documentsForCollection = [];
            for(var i = 0; i < documents.length; i++) {
                if(documents[i].collectionId === collectionId){
                    documentsForCollection.push(documents[i]);
                }
            }
            callback(documentsForCollection)
        }

        function deleteDocumentById(documentId, callback) {
            var indexToRemove = -1;
            for(var i = 0 ; i < documents.length; i++) {
                if(documents[i]._id === documentId) {
                    indexToRemove = i;
                }
            }

            if(indexToRemove > -1) {
                documents.splice(indexToRemove, 1);
            }

            callback(documents);
        }

        function updateDocumentById(documentId, newDocument, callback) {
            for(var i = 0; i < documents.length; i++) {
                if(documents[i]._id ===  documentId) {
                    documents[i].name = newDocument.name;
                    callback(newDocument);
                }
            }
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