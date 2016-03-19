/**
 * Created by TanmayPC on 2/19/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegController", regController);

    function regController($scope, $routeParams, UserService, $rootScope, $location) {
        $scope.createUser = createUser;

        if($scope.username == "") {
            createUser($scope.username, $scope.pwd, $scope.vpwd, $scope.email);
        }

        function createUser(user) {
            console.log(user);
            if(user.pwd == user.vpwd) {
                var usr = {"username": user.username, "password": user.pwd, "roles": ["student"],
                            "email": user.email};
                UserService.createUser(usr, function(response){
                    console.log(response);
                    $rootScope.loggedUser = response;
                    $location.url("profile");
                });
            }
        }
    }
})();