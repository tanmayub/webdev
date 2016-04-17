/**
 * Created by TanmayPC on 3/25/2016.
 */

var q = require('q');

var documents = require("./document.mock.json");

module.exports = function(mongojs, ConnectionModel) {

    var connectionModel = ConnectionModel.getMongooseModel();

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
        updateProperty: updateProperty,
        setConfig: setConfig
    };
    return api;

    var db;

    var connId;

    var connectionString;

    var collection;

    function createDocumentForCollection(document) {
        documents.push(document);
        return document;
    }

    function setConfig(connId, colName) {

        if(db)
            db.close();

        connId = connId;

        connectionModel = ConnectionModel.getMongooseModel();

        connectionModel.findById(connId).then(

            function (conn) {
                connectionString = conn.connectionString;

                db = mongojs(connectionString);

                collection = db.collection(colName);
            }
        );
    }

    function findAllDocumentsForCollection(collectionId) {
        //console.log(collection);
        var deferred = q.defer();

        collection.find(function(err, docs) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(docs);
            }
        });

        return deferred.promise;
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