/**
 * Created by TanmayPC on 2/19/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope, $routeParams, UserService, $rootScope, $location) {
        $scope.findAllUsers = findAllUsers;

        if($rootScope.loggedUser) {
            findAllUsers();

            function findAllUsers() {
                console.log("hi");
                UserService.findAllUsers(function (response) {
                    console.log(response);
                    $scope.users = response;
                });
            }
        }
        else {
            $location.url("home");
        }
    }
})();