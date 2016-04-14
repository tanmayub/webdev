/**
 * Created by TanmayPC on 2/19/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", headerController);

    function headerController($scope, $location, UserService) {
        $scope.$location = $location;
        $scope.logoutUser = logoutUser;

        function logoutUser() {
            /*if ($rootScope.currentUser) {
                delete $rootScope.currentUser;
            }*/
            UserService.logout()
                .then(function() {
                    $location.url("home");
                    delete $rootScope.currentUser;
                });
        }
    }
})();