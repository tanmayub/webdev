/**
 * Created by TanmayPC on 2/19/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope, $routeParams, FormService, $rootScope, $location) {
        $scope.findAllFormsForUser = findAllFormsForUser;

        findAllFormsForUser();

        function findAllFormsForUser() {
            console.log("form controller");

            FormService.findAllFormsForUser($rootScope.loggedUser._id, function(response) {
                console.log(response);
                $scope.forms = response;
            });
        }
    }
})();