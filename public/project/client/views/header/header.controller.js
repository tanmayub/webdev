/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $location) {

        var vm = this;

        function init() {

            vm.$location = $location;
        }
        init();

        vm.logout = logout;

        function logout() {

            UserService.logout().then(function(response) {

                UserService.setCurrentUser(null);
                $location.url("/home");
            });
        }
    }
})();

