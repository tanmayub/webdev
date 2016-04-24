/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {

        var vm = this;

        vm.login = login;

        function login(user) {

            UserService.login(user).then(isUserPresent);
        }

        function isUserPresent(response) {

            if(response) {

                UserService.setCurrentUser(response);

                $location.url("/connection");
            }
        }
    }
})();