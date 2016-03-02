/**
 * Created by TanmayPC on 3/1/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234},
            ]

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return api;

        function createFormForUser(userId, form, callback) {
            form._id = Math.floor(Math.random() * 900) + 100;
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var formsForUser = [];
            for(var i = 0; i < forms.length; i++) {
                if(forms[i].userId == userId){
                    formsForUser.push(forms[i]);
                }
            }
            callback(formsForUser)
        }

        function deleteFormById(formId, callback) {
            var indexToRemove = -1;
            for(var i = 0 ; i < forms.length; i++) {
                if(forms[i]._id == formId) {
                    indexToRemove = i;
                }
            }

            if(indexToRemove > -1) {
                forms.splice(indexToRemove, 1);
            }

            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for(var i = 0; i < forms.length; i++) {
                if(forms[i]._id == formId) {
                    forms[i].title = newForm.title;
                    forms[i].userId = newForm.userId;

                    callback(forms[i]);
                }
            }
        }
    }
})();