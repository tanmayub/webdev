/**
 * Created by TanmayPC on 2/19/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ConnectionsController", connectionsController);

    function connectionsController(ConnectionsService, $rootScope, $location) {

        var vm = this;

        var toBeUpdatedIndex;

        function init() {

            ConnectionsService.findAllConnectionsForUser($rootScope.currentUser._id).then(function(response) {

                vm.connections = response;

                vm.$location = $location;

            });

            toBeUpdatedIndex = -1;

        }
        init();

        vm.updateConnection = updateConnection;

        vm.addConnection = addConnection;

        vm.deleteConnection = deleteConnection;

        vm.selectConnection = selectConnection;

        vm.editConnection = editConnection;


        function editConnection($index) {

            vm.connection = {

                _id: vm.connections[$index]._id,

                name: vm.connections[$index].name,

                dbname: vm.connections[$index].dbname,

                host: vm.connections[$index].host,

                port: vm.connections[$index].port,

                username: vm.connections[$index].username,

                userId : vm.connections[$index].userId,

                password: vm.connections[$index].password
            };

            toBeUpdatedIndex = $index;
        }

        function addConnection(connection) {

            ConnectionsService.createConnectionForUser($rootScope.currentUser._id, connection)

                .then(function (response) {

                        //vm.connections = response;
                        init();

                        vm.connection = {};
                });
        }

        function updateConnection(connection) {

            ConnectionsService.updateConnectionById(connection._id, connection)

                .then(function (response) {

                    if (response === "OK") {

                        init();
                        vm.connection = {};
                    }
                });
        }

        function deleteConnection($index) {
            var connectionId = vm.connections[$index]._id;
            
            ConnectionsService.deleteConnectionById(connectionId)

                .then(function (response) {

                    if(response === "OK")
                    init();
                });
        }

        function selectConnection(connection) {

            vm.selectConnectionIndex = vm.connections.indexOf(connection);

            vm.selectedConnection = connection._id;
        }

    }
})();