/**
 * Created by TanmayPC on 2/19/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $location, UserService, $rootScope) {
        $scope.findUserByCredentials = findUserByCredentials;
        $scope.updateUser = updateUser;

        if($rootScope.loggedUser) {
            if ($rootScope.loggedUser.username != "") {
                findUserByCredentials($scope.username, $scope.pwd, $scope.vpwd, $scope.email);
            }

            function findUserByCredentials() {
                UserService.findUserByCredentials($rootScope.loggedUser.username,
                    $rootScope.loggedUser.password, function (response) {
                        console.log(response);
                        $scope.user = response;
                    });
            }

            function updateUser(user) {
                console.log(user);
                var usr = {
                    "username": user.username, "password": user.password, "email": user.email,
                    "firstName": user.firstName, "lastName": user.lastName
                };
                UserService.updateUser($rootScope.loggedUser._id, usr, function (response) {
                    console.log(response);
                });
            }
        }
        else {
            $location.url("home");
        }
    }
})();