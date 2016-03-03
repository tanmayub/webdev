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

        function createUser(username, pwd, vpwd, email) {
            console.log(username, pwd, vpwd, email);
            if(pwd == vpwd) {
                var user = {"username": username, "password": pwd, "roles": ["student"],
                            "email": email};
                UserService.createUser(user, function(response){
                    console.log(response);
                    $rootScope.loggedUser = response;
                    $location.url("profile");
                });
            }
        }
    }
})();