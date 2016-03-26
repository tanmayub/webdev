/**
 * Created by sudeep on 3/4/16.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("DataController", dataController);

    function dataController($scope, $rootScope, $routeParams, $location, DocumentsService) {

        var vm = this;

        vm.addProperty = addProperty;
        vm.editProperty = editProperty;
        vm.deleteProperty = deleteProperty;
        vm.updateProperty = updateProperty;

        var docId = parseInt($routeParams.id);
        var oldProp = "";

        function init() {

            DocumentsService.findDocumentById(docId)

                .then(function(doc) {

                    vm.document = doc;
                    return  DocumentsService.getProperties(docId);

                })

                .then(function(attributes) {

                    vm.attributes = attributes;
                });
        }init();

        function addProperty(prop) {

            DocumentsService.createDocumentProp(docId, prop)

                .then(function(response) {

                    vm.document = response;

                    vm.attributes.push(prop.name);

                    vm.property = {};
                });
        }

        function editProperty(prop) {

            var p = {name: prop, value: vm.document[prop]};

            vm.property = p;

            oldProp = prop;
        }

        function deleteProperty(propName) {

            DocumentsService.deleteProperty(docId, propName)

                .then(function(response) {

                    if (response === "OK") {

                        return DocumentsService.findDocumentById(docId);
                    }
                })

                .then( function (response) {

                    vm.document = response;

                    var ind = vm.attributes.indexOf(propName);

                    vm.attributes.splice(ind, 1);

                })
        }

        function updateProperty(prop) {

            if (prop.name === oldProp) {

                DocumentsService.updateProperty(docId, prop)

                    .then(function(response) {

                        if(response === "OK") {
                            return DocumentsService.findDocumentById(docId);
                        }
                    })

                    .then(function (response) {

                        vm.document = response;

                    });
            }

            else {

                deleteProperty(oldProp);
                addProperty(prop);
            }

            vm.property = {};
        }
    }

})();