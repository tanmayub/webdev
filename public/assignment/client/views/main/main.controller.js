/**
 * Created by TanmayPC on 2/19/2016.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", mainController);

    function mainController($scope, $location) {
        $scope.$location = $location;
    }
})();