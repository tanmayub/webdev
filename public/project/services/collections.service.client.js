/**
 * Created by sudeep on 3/3/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .factory("CollectionsService", CollectionsService);

    function CollectionsService() {
        var collections = [
            {
                _id:      12143,
                name:     'test',
                connId:   1212
            },
            {
                _id:      12144,
                name:     'admin',
                connId:   1213
            },
            {
                _id:      12145,
                name:     'first',
                connId:   1214
            },
        ]

        var api = {
            createCollectionForUser: createCollectionForUser,
            findAllCollectionsForConnection: findAllCollectionsForConnection,
            deleteCollectionById: deleteCollectionById,
            updateCollectionById: updateCollectionById
        };
        return api;

        function createCollectionForUser(connId, collection, callback) {
            collection._id = Math.floor(Math.random() * 900) + 100;
            collection.connId = connId;
            collections.push(collection);
            callback(collection);
        }

        function findAllCollectionsForConnection(connId, callback) {
            var collectionsForConnection = [];
            for(var i = 0; i < collections.length; i++) {
                if(collections[i].connId == connId){
                    collectionsForConnection.push(collections[i]);
                }
            }
            callback(collectionsForConnection)
        }

        function deleteCollectionById(collectionId, callback) {
            var indexToRemove = -1;
            for(var i = 0 ; i < collections.length; i++) {
                if(collections[i]._id == collectionId) {
                    indexToRemove = i;
                }
            }

            if(indexToRemove > -1) {
                collections.splice(indexToRemove, 1);
            }

            callback(collections);
        }

        function updateCollectionById(collectionId, newCollection, callback) {
            for(var i = 0; i < collections.length; i++) {
                if(collections[i]._id == collectionId) {
                    collections[i].name = newCollection.name;
                    collections[i].connId = newCollection.connId;

                    callback(collections[i]);
                }
            }
        }
    }
})();
