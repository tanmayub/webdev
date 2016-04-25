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
                    })
            });

        }
        init();

        function deleteUser(userId, connection) {
            if(userId) {
                delete connection.addUser;
                delete connection.users;

                ConnectionsService.removeSharedConnection(userId, connection)
                    .then(function (response) {
                        if (response) {
                            init();
                        }
                    });
                //console.log(userId, connection)
            }
        }

        function addUser(userId, connection) {
            if(userId) {
                delete connection.addUser;
                delete connection.users;

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
