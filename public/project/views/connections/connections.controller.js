/**
 * Created by TanmayPC on 2/19/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ConnectionsController", connectionsController);

    function connectionsController($scope, ConnectionsService, $rootScope, $location) {
        $scope.findAllConnectionsForUser = findAllConnectionsForUser;
        $scope.updateConnection = updateConnection;
        $scope.addConnection = addConnection;
        $scope.deleteConnection = deleteConnection;
        $scope.selectConnection = selectConnection;
        $scope.editConnection = editConnection;

        if($rootScope.loggedUser) {
            var selectConnectionIndex = -1;

            findAllConnectionsForUser();

            function findAllConnectionsForUser() {
                console.log("connections controller");

                ConnectionsService.findAllConnectionsForUser($rootScope.loggedUser._id, function (response) {
                    console.log(response);
                    $scope.connections = response;
                });
            }

            function editConnection() {
                var name = $scope.connections[selectConnectionIndex].name;
                var db = $scope.connections[selectConnectionIndex].db;
                var host = $scope.connections[selectConnectionIndex].host;
                var port = $scope.connections[selectConnectionIndex].port;
                var username = $scope.connections[selectConnectionIndex].username;
                var password = $scope.connections[selectConnectionIndex].password;
                $scope.connection = {name: name, db: db, host: host, port: port, username: username, password: password};
            }

            function addConnection(connection) {
                var conn = {name: connection.name, userId: $rootScope.loggedUser._id, host: connection.host,
                            port: connection.port, username: connection.username, password: connection.password, db: connection.db};
                ConnectionsService.createConnectionForUser($rootScope.loggedUser._id, conn, function (response) {
                    console.log(response);
                    $scope.connections.push(response);
                    $scope.connection = {};
                });
            }

            function updateConnection(connection) {
                if (selectConnectionIndex > -1) {
                    var connectionId = $scope.connections[selectConnectionIndex]._id;
                    var conn = {name: connection.name, userId: $rootScope.loggedUser._id, host: connection.host,
                                port: connection.port, username: connection.username, password: connection.password, db: connection.db};
                    ConnectionsService.updateConnectionById(connectionId, conn, function (response) {
                        console.log(response);
                        $scope.connection = {};
                    });
                }
            }

            function deleteConnection() {
                var connectionId = $scope.connections[selectConnectionIndex]._id;
                ConnectionsService.deleteConnectionById(connectionId, function (response) {
                    console.log(response);
                    findAllConnectionsForUser();
                });
            }

            function selectConnection(connection) {
                console.log(connection);
                selectConnectionIndex = $scope.connections.indexOf(connection);
                console.log(selectConnectionIndex)
                $scope.selectedConnection = connection._id;
            }
        }
        else {
            $location.url("home");
        }
    }
})();