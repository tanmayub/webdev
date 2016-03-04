/**
 * Created by sudeep on 3/4/16.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("DataController", dataController);

    function dataController($scope, $rootScope, $routeParams, $location, DocumentsService) {
        $scope.addProperty = addProperty;
        $scope.editProperty = editProperty;
        $scope.deleteProperty = deleteProperty;

        var docId = $routeParams.id;

        DocumentsService.getDocumentById(docId, function(doc) {
            $scope.document = doc;
        });

        DocumentsService.getProperties(docId, function(attributes) {
            $scope.attributes = attributes;
        });

        console.log($scope.attributes);
        console.log($scope.document);

        function addProperty(prop) {}

        function editProperty($index) {}

        function deleteProperty($index) {}
    }

})();
