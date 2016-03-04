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
        $scope.updateProperty = updateProperty;

        var docId = $routeParams.id;
        var oldProp = "";

        DocumentsService.getDocumentById(docId, function(doc) {
            $scope.document = doc;
        });

        DocumentsService.getProperties(docId, function(attributes) {
            $scope.attributes = attributes;
        });

        console.log($scope.attributes);
        console.log($scope.document);

        function addProperty(prop) {
            DocumentsService.createDocumentProp(docId, prop, function(response) {
                $scope.document = response;
                $scope.attributes.push(prop.name);
            });
        }

        function editProperty(prop) {
            var p = {name: prop, value: $scope.document[prop]};
            console.log(p);
            $scope.property = p;
            oldProp = prop;
        }

        function deleteProperty(propName) {
            DocumentsService.deleteProperty(docId, propName, function(response) {
                $scope.document = response;
                var ind = $scope.attributes.indexOf(propName);
                $scope.attributes.splice(ind, 1);
            });
        }

        function updateProperty(prop) {
            deleteProperty(oldProp);
            addProperty(prop);
            $scope.property = {};
        }
    }

})();
