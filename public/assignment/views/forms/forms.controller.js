/**
 * Created by TanmayPC on 2/19/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope, $routeParams, FormService, $rootScope, $location) {
        $scope.findAllFormsForUser = findAllFormsForUser;
        $scope.updateForm = updateForm;
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        findAllFormsForUser();

        function findAllFormsForUser() {
            console.log("form controller");

            FormService.findAllFormsForUser($rootScope.loggedUser._id, function(response) {
                console.log(response);
                $scope.forms = response;
            });
        }

        function addForm(title) {
            var form = {"title": title};
            FormService.createFormForUser($rootScope.loggedUser._id, form, function(response) {
                console.log(response);
            });
        }

        function updateForm(formId, title) {
            var form = {"title": title};
            FormService.updateFormById(formId, form, function(response) {
                console.log(response);
            });
        }

        function deleteForm(formId) {
            FormService.deleteFormById(formId, function(response) {
                console.log(response);
            });
        }

        function selectForm() {

        }
    }
})();