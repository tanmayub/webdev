/**
 * Created by TanmayPC on 3/1/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("ConnectionsService", ConnectionsService);

    function ConnectionsService() {
        var connections = [
                {
                    _id:      1212,
                    db:       'admin',
                    host:     'localhost',
                    password: 'admin',
                    port:     27017,
                    ssl:      false,
                    url:      'mongodb://localhost:27017/admin',
                    username: 'admin',
                    name:     'admin',
                    userId:   123
                },
                {
                    _id:      1213,
                    db:       'test',
                    host:     'localhost',
                    password: 'test',
                    port:     27017,
                    ssl:      false,
                    url:      'mongodb://localhost:27017/test',
                    username: 'test',
                    name:     'test',
                    userId:   123
                },
                {
                    _id:      1214,
                    db:       'db',
                    host:     'localhost',
                    password: 'db',
                    port:     27017,
                    ssl:      false,
                    url:      'mongodb://localhost:27017/db',
                    username: 'db',
                    name:     'db',
                    userId:   234
                },
            ]

        var api = {
            createConnectionForUser: createConnectionForUser,
            findAllConnectionsForUser: findAllConnectionsForUser,
            deleteConnectionById: deleteConnectionById,
            updateConnectionById: updateConnectionById
        };
        return api;

        function createConnectionForUser(userId, connection, callback) {
            connection._id = Math.floor(Math.random() * 900) + 100;
            connection.userId = userId;
            connections.push(connection);
            callback(connection);
        }

        function findAllConnectionsForUser(userId, callback) {
            var connectionsForUser = [];
            for(var i = 0; i < connections.length; i++) {
                if(connections[i].userId == userId){
                    connectionsForUser.push(connections[i]);
                }
            }
            callback(connectionsForUser)
        }

        function deleteConnectionById(connectionId, callback) {
            var indexToRemove = -1;
            for(var i = 0 ; i < connections.length; i++) {
                if(connections[i]._id == connectionId) {
                    indexToRemove = i;
                }
            }

            if(indexToRemove > -1) {
                connections.splice(indexToRemove, 1);
            }

            callback(connections);
        }

        function updateConnectionById(connectionId, newConnection, callback) {
            for(var i = 0; i < connections.length; i++) {
                if(connections[i]._id == connectionId) {
                    connections[i].name = newConnection.name;
                    connections[i].db = newConnection.db;
                    connections[i].password = newConnection.password;
                    connections[i].username = newConnection.username;
                    connections[i].host = newConnection.host;
                    connections[i].port = newConnection.port;
                    connections[i].userId = newConnection.userId;

                    callback(connections[i]);
                }
            }
        }
    }
})();