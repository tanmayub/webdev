/**
 * Created by sudeep on 4/24/16.
 */

"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ShareController", shareController);

    function shareController(UserService, ConnectionsService, $rootScope, $location) {

        var vm = this;

        vm.deleteUser = deleteUser;
        vm.addUser = addUser;

        function init() {

            ConnectionsService.findAllConnectionsForUser($rootScope.currentUser._id).then(function(response) {

                UserService.findAllUsers()
                    .then(function(users) {
                        //response.users = users;
                        for(var r in response) {
                            response[r].users = [];
                            response[r].addUser = [];
                            for (var u in users) {
                                if (response[r].userId.indexOf(users[u]._id) > -1) {
                                    response[r].users.push(users[u]);
                                }
                                else {
                                    response[r].addUser.push(users[u]);
                                }
                            }
                        }
                        vm.connections = response;
                        vm.$location = $location;
                    });

            });

        }
        init();

        function deleteUser(userId, connection) {
            ConnectionsService.removeSharedConnection(userId, connection)
                .then(function(response) {
                    if(response) {
                        init();
                    }
                });
            //console.log(userId, connection)
        }

        function addUser($index, connection) {

            var connIndex = vm.connections.indexOf(connection);
            var userId = vm.connections[connIndex].addUser[$index]._id;

            if(userId) {
                ConnectionsService.shareConnection(connection, userId)
                    .then(function (response) {
                        if (response) {
                            init();
                        }
                    });
            }
            //console.log(userId, connection)
        }
    }
})();
