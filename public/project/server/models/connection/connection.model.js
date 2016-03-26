/**
 * Created by sudeep on 3/24/16.
 */

"use strict"

var mock = require("./connection.mock.json");

module.exports = function() {

    var api = {

        addConnection: addConnection,
        findAllConnectionsByUserId: findAllConnectionsByUserId,
        findConnectionById: findConnectionById,
        deleteConnectionById: deleteConnectionById,
        updateConnectionById: updateConnectionById
    };
    return api;

    function addConnection(connection) {

        mock.push(connection);

    }

    function findAllConnectionsByUserId(userId) {

        var connectionsForUser = [];
        for(var i in mock) {

            if(mock[i].userId == userId){
                connectionsForUser.push(mock[i]);
            }
        }

        return connectionsForUser;

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

        for(var i in mock) {
            if(mock[i]._id == connectionId) {

                mock.splice(i,1);
                break;
            }
        }

        return mock;

    }

    function updateConnectionById(connectionId, newConnection) {

        for(var i in mock) {

            if(mock[i]._id == connectionId) {

                mock[i] = {
                    
                    _id: newConnection._id,
                    name : newConnection.name,
                    db : newConnection.db,
                    username: newConnection.username,
                    host : newConnection.host,
                    port : newConnection.port,
                    userId : newConnection.userId,
                    password: newConnection.password

                }

                return mock[i];
            }
        }
    }
}