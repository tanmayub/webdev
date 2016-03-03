/**
 * Created by TanmayPC on 3/2/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", fieldsController);

    function fieldsController($location, $rootScope) {
        if(!$rootScope.loggedUser) {
            $location.url("home");
        }
    }
})();