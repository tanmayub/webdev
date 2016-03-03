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
        $scope.editFormTitle = editFormTitle;

        var selectFormIndex = -1;

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
                $scope.forms.push(response);
                $scope.title = "";
            });
        }

        function editFormTitle() {
            var title = $scope.forms[selectFormIndex].title;
            $scope.title = title;
        }

        function updateForm(title) {
            if(selectFormIndex > -1) {
                var formId = $scope.forms[selectFormIndex]._id;
                var form = {"title": title, "userId": $rootScope.loggedUser._id};
                FormService.updateFormById(formId, form, function (response) {
                    console.log(response);
                    $scope.title = "";
                });
            }
        }

        function deleteForm() {
            var formId = $scope.forms[selectFormIndex]._id;
            FormService.deleteFormById(formId, function(response) {
                console.log(response);
                findAllFormsForUser();
            });
        }

        function selectForm(form) {
            console.log(form);
            selectFormIndex = $scope.forms.indexOf(form);
            $scope.selectedForm = form._id;
        }
    }
})();