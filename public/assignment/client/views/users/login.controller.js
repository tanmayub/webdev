/**
 * Created by TanmayPC on 2/19/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController ($scope, UserService, $rootScope, $location){
        $scope.findUserByCredentials = findUserByCredentials;

        function findUserByCredentials(user) {
            console.log(user);
            UserService.findUserByCredentials(user.username, user.pwd, function(response){
                console.log(response);
                $rootScope.loggedUser = response;
                $location.url("profile");
            });
        }
    }
})();