/**
 * Created by sudeep on 3/24/16.
 */

"use strict"

var mock = require("./connection.mock.json");
var q = require("q");

module.exports = function(db, mongoose) {

    var ConnectionSchema = require("./connection.schema.server.js")(mongoose);

    var ConnectionModel = mongoose.model('connection', ConnectionSchema);

    var api = {

        createConnection: createConnection,
        findAllConnectionsForUser: findAllConnectionsForUser,
        findConnectionById: findConnectionById,
        deleteConnectionById: deleteConnectionById,
        updateConnectionById: updateConnectionById
    };
    return api;

    function createConnection(connection) {
        return ConnectionModel.create(connection);
    }

    function findAllConnectionsForUser(userId) {
        return ConnectionModel.find({userId: userId});

    }

    function findConnectionById(connectionId) {

        for (var i in mock) {

            if(mock[i]._id === connectionId) {

                return mock[i];
            }
        }

        return null;

    }
    function deleteConnectionById(connectionId) {

        return ConnectionModel.remove({_id: connectionId});

    }

    function updateConnectionById(connectionId, newConnection) {

        return ConnectionModel.findOneAndUpdate({_id: connectionId}, newConnection);
    }
}