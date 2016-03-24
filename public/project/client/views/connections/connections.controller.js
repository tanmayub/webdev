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

        function findAllConnectionsForUser() {

            ConnectionsService.findAllConnectionsForUser($rootScope.loggedUser._id, function (response) {
                $scope.connections = response;
            });
        }

        function editConnection($index) {
            var name = $scope.connections[$index].name;
            var db = $scope.connections[$index].db;
            var host = $scope.connections[$index].host;
            var port = $scope.connections[$index].port;
            var username = $scope.connections[$index].username;
            var password = $scope.connections[$index].password;
            var _id = $scope.connections[$index]._id;
            $scope.connection = {_id: _id, name: name, db: db, host: host, port: port, username: username, password: password};
        }

        function addConnection(connection) {
            var conn = {name: connection.name, userId: $rootScope.loggedUser._id, host: connection.host,
                port: connection.port, username: connection.username, password: connection.password, db: connection.db};
            ConnectionsService.createConnectionForUser($rootScope.loggedUser._id, conn, function (response) {
                $scope.connections.push(response);
                $scope.connection = {};
            });
        }

        function updateConnection(connection) {
            var conn = {name: connection.name, userId: $rootScope.loggedUser._id, host: connection.host,
                port: connection.port, username: connection.username, password: connection.password, db: connection.db};
            ConnectionsService.updateConnectionById(connection._id, conn, function (response) {
                $scope.connection = {};
            });
        }

        function deleteConnection($index) {
            var connectionId = $scope.connections[$index]._id;
            ConnectionsService.deleteConnectionById(connectionId, function (response) {
                findAllConnectionsForUser();
            });
        }

        function selectConnection(connection) {
            selectConnectionIndex = $scope.connections.indexOf(connection);
            $scope.selectedConnection = connection._id;
        }

        if($rootScope.loggedUser) {
            var selectConnectionIndex = -1;

            findAllConnectionsForUser();
        }
        else {
            $location.url("home");
        }
    }
})();