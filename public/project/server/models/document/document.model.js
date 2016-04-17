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

        var deferred = q.defer();

        collection.remove({_id: db.ObjectId(documentId)}, {}, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateDocumentById(documentId, newDocument) {
        var deferred = q.defer();

        delete newDocument._id;

        collection.update({_id: db.ObjectId(documentId)}, newDocument, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
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