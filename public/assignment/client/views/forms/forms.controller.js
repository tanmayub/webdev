/**
 * Created by TanmayPC on 2/19/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController(FormService, $rootScope, $location) {
        var vm = this;
        vm.updateForm = updateForm;
        vm.addForm = addForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.editFormTitle = editFormTitle;

        if($rootScope.currentUser) {
            var selectFormIndex = -1;
            init();

            function init() {
                FormService.findAllFormsForUser($rootScope.currentUser._id).then(function(response) {
                    console.log(response);
                    vm.forms = response;
                    vm.$location = $location;
                });
            }
        }
        else {
            $location.url("home");
        }

        function addForm(form) {
            var form = {"title": form.title};
            FormService.createFormForUser($rootScope.currentUser._id, form).then(function(response) {
                vm.forms = response;
            });
            vm.form = {};
        }

        function editFormTitle() {
            var title = vm.forms[selectFormIndex].title;
            vm.form = {title: title};
        }

        function updateForm(form) {
            if (selectFormIndex > -1) {
                var formId = vm.forms[selectFormIndex]._id;
                var frm = {"title": form.title, "userId": $rootScope.currentUser._id};
                FormService.updateFormById(formId, frm)
                    .then(function (response) {
                        if (response) {
                            console.log(response);
                            vm.forms[selectFormIndex] = response;
                        }
                    });
                vm.form={};
            }
        }

        function deleteForm() {
            var formId = vm.forms[selectFormIndex]._id;
            FormService.deleteFormById(formId).then(function(response) {
                if(response === "OK") {
                    init();
                }
            });
        }

        function selectForm(form) {
            console.log(form);
            selectFormIndex = vm.forms.indexOf(form);
            vm.selectedForm = form._id;
        }
    }
})();