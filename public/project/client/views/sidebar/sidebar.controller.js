/**
 * Created by TanmayPC on 2/19/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", sidebarController);

    function sidebarController($scope, $rootScope, $location) {
        $scope.navAdmin = navAdmin;

        function navAdmin() {
            if($rootScope.loggedUser) {
                if($rootScope.loggedUser.roles.indexOf('admin') > -1) {
                    return false;
                }
            }
            return true;
        }
    }
})();