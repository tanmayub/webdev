/**
 * Created by TanmayPC on 2/19/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController ($scope, $routeParams, UserService, $rootScope, $location){
        $scope.findUserByCredentials = findUserByCredentials;

        function findUserByCredentials(username, pwd) {
            console.log(username, pwd);
            UserService.findUserByCredentials(username, pwd, function(response){
                console.log(response);
                $rootScope.loggedUser = response;
                $location.url("/connection");
            });
        }
    }
})();