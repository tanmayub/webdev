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

    }

    function findAllCollectionsForConnection() {

        var deferred = q.defer();

        db.getCollectionNames(function (err, collections) {
            if(err) {
                deferred.reject();
                console.log(err);
            } else {
                deferred.resolve(collections);
                console.log(collections);
            }
        });

        return deferred.promise;
    }

    function findCollectionById(colId) {

    }

    function deleteCollectionById(collectionId) {

    }

    function updateCollectionById(collectionId, newCollection) {

    }
};