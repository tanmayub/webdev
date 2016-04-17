/**
 * Created by TanmayPC on 3/24/2016.
 */

var q = require('q');

module.exports = function(mongojs, ConnectionModel) {

    var connectionModel = ConnectionModel.getMongooseModel();

    var api = {
        setConnectionId: setConnectionId,
        createCollection: createCollection,
        findAllCollectionsForConnection: findAllCollectionsForConnection,
        deleteCollectionById: deleteCollectionById,
        updateCollectionById: updateCollectionById,
        findCollectionById: findCollectionById
    };
    return api;

    var connId;

    var connectionString;

    var db;

    function setConnectionId(connId) {

        if(db)
            db.close();

        connId = connId;

        connectionModel = ConnectionModel.getMongooseModel();

        connectionModel.findById(connId).then(

            function (conn) {
                connectionString = conn.connectionString;

                db = mongojs(connectionString);
            }
        );
    }

    function createCollection(collection) {

        var deferred = q.defer();

        db.createCollection(collection, function (err, coll) {

            if(err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(coll);
            }
        });

        return deferred.promise;
    }

    function findAllCollectionsForConnection() {

        var deferred = q.defer();

        db.getCollectionNames(function (err, collections) {

            if(err) {

                deferred.reject(err);

            } else {

                deferred.resolve(collections);
            }
        });

        return deferred.promise;
    }

    function findCollectionById(colId) {

    }

    function deleteCollectionById(collName) {

        var deferred = q.defer();

        var collection = db.collection(collName);

        collection.drop(function (err, doc) {

            if(err) {

                deferred.reject(err);

            } else {

                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function updateCollectionById(colName, newCollection) {

        var deferred = q.defer();

        var collection = db.collection(colName);

        collection.rename(newCollection.collection, {}, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
};