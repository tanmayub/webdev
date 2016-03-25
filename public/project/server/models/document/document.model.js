/**
 * Created by TanmayPC on 3/25/2016.
 */
var documents = require("./document.mock.json");

module.exports = function() {

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

    function createDocumentForCollection(document) {
        documents.push(document);
        return document;
    }

    function findAllDocumentsForCollection(collectionId) {
        var documentsForCollection = [];
        for(var d in documents) {
            if(documents[d].collectionId === collectionId){
                documentsForCollection.push(documents[d]);
            }
        }
        return documentsForCollection;
    }

    function findDocumentById(documentId) {
        for (var i in documents) {
            if(documents[i]._id === documentId) {
                return documents[i];
            }
        }

        return null;
    }

    function deleteDocumentById(documentId) {
        for(var i = 0 ; i < documents.length; i++) {
            if(documents[i]._id === documentId) {
                documents.splice(i, 1);
                break;
            }
        }
        return documents;
    }

    function updateDocumentById(documentId, newDocument) {
        for(var i = 0; i < documents.length; i++) {
            if(documents[i]._id ===  documentId) {
                documents[i].name = newDocument.name;
                return newDocument;
            }
        }
    }

    function getAllProperties() {

    }

    function getDocumentById () {

    }

    function createDocumentProp() {

    }

    function deleteProperty() {

    }

    function updateProperty() {

    }
}