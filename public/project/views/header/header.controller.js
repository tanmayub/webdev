/**
 * Created by TanmayPC on 2/19/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", headerController);

    function headerController($scope, $location, $rootScope) {
        $scope.$location = $location;
        $scope.logoutUser = logoutUser;

        function logoutUser() {
            if ($rootScope.loggedUser) {
                delete $rootScope.loggedUser;
            }
            $location.url("home");
        }
    }
})();