/**
 * Created by TanmayPC on 2/19/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $routeParams, UserService, $rootScope) {
        $scope.findUserByUsernameAndPassword = findUserByUsernameAndPassword;
        $scope.updateUser = updateUser;

        if($rootScope.loggedUser.username != "") {
            findUserByUsernameAndPassword($scope.username, $scope.pwd, $scope.vpwd, $scope.email);
        }

        function findUserByUsernameAndPassword() {
            UserService.findUserByUsernameAndPassword($rootScope.loggedUser.username,
                $rootScope.loggedUser.password, function(response) {
                    console.log(response);
                    $scope.username = response.username;
                    $scope.pwd = response.password;
                    $scope.email = response.email;
                    if(response.firstName != "") {
                        $scope.fName = response.firstName;
                    }
                    if(response.lastName != "") {
                        $scope.lName = response.lastName;
                    }
                });
        }

        function updateUser(username, pwd, fName, lName, email) {
            console.log(username, pwd, fName, lName, email);
            var user = {"username": username, "password": pwd, "email": email,
                        "firstName": fName, "lastName": lName};
            UserService.updateUser($rootScope.loggedUser._id, user, function(response) {
                console.log(response);
            });
        }
    }
})();