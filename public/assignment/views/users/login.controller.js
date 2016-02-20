/**
 * Created by TanmayPC on 2/19/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController ($scope, $routeParams, UserService, $rootScope, $location){
        $scope.findUserByUsernameAndPassword = findUserByUsernameAndPassword;

        function findUserByUsernameAndPassword(username, pwd) {
            console.log(username, pwd);
            UserService.findUserByUsernameAndPassword(username, pwd, function(response){
                console.log(response);
                $rootScope.loggedUser = response;
                $location.url("profile");
            });
        }
    }
})();