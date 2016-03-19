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
            //console.log(!$rootScope.loggedUser);
            if($rootScope.currentUser) {
                console.log($rootScope.currentUser);
                console.log($rootScope.currentUser.roles);
                //console.log(($rootScope.loggedUser.roles.indexOf('admin') > -1));
                if($rootScope.currentUser.roles.indexOf('admin') > -1) {
                    return false;
                }
            }
            return true;
        }
    }
})();