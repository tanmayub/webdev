"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", sidebarController);

    function sidebarController($scope, $rootScope, $location) {
        $scope.navAdmin = navAdmin;

        function navAdmin() {
            if($rootScope.currentUser) {
                if($rootScope.currentUser.roles.indexOf('admin') > -1) {
                    return false;
                }
            }
            return true;
        }
    }
})();