/**
 * Created by TanmayPC on 3/24/2016.
 */

var collections = require("./collection.mock.json");
module.exports = function(colModel, uuid) {

    var api = {
        createCollection: createCollection,
        findAllCollectionsForConnection: findAllCollectionsForConnection,
        deleteCollectionById: deleteCollectionById,
        updateCollectionById: updateCollectionById,
        findCollectionById: findCollectionById
    };
    return api;

    function createCollection(collection) {
        //console.log(collection);
        collections.push(collection);
        return collection;
    }

    function findAllCollectionsForConnection(connId) {

        var collectionsForConnection = [];
        for(var col in collections) {
            if(collections[col].connId === connId){
                collectionsForConnection.push(collections[col]);
            }
        }

        return collectionsForConnection;
    }

    function findCollectionById(colId) {
        for(var col in collections) {
            if(collections[col]._id === colId) {
                return collections[col];
            }
        }
    }

    function deleteCollectionById(collectionId) {
        var indexToRemove = -1;
        for(var i = 0 ; i < collections.length; i++) {
            if(collections[i]._id === collectionId) {
                indexToRemove = i;
            }
        }

        if(indexToRemove > -1) {
            collections.splice(indexToRemove, 1);
        }

        return collections;
    }

    function updateCollectionById(collectionId, newCollection) {
        //console.log(collectionId, newCollection);
        for(var col in collections) {
            if(collections[col]._id === collectionId) {
                collections[col].name = newCollection.name;
                collections[col].connId = newCollection.connId;
                //console.log(collections[col]);
                return collections[col];
            }
        }
    }
};