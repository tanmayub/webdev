/**
 * Created by sudeep on 3/4/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("DocumentsController", documentsController)
        .animation('.slide', slide);

    function documentsController($scope, $routeParams, DocumentsService, $location, $rootScope) {

        var vm = this;

        vm.findAllDocumentsForCollection = findAllDocumentsForCollection;
        vm.updateDocument = updateDocument;
        vm.addDocument = addDocument;
        vm.deleteDocument = deleteDocument;
        vm.selectDocument = selectDocument;
        vm.editDocument = editDocument;

        vm.collectionId = $routeParams.id;
        vm.connectionId = $routeParams.connectionId;
        var toBeUpdatedIndex;

        function init() {
            if($rootScope.currentUser) {
                //findAllDocumentsForCollection();
                DocumentsService.configCollection(vm.connectionId, vm.collectionId).then(function(response) {

                    if(response === "OK") {

                        findAllDocumentsForCollection();
                    }
                });
            }
            else {
                $location.url("home");
            }
            toBeUpdatedIndex = -1;
        }
        init();

        function findAllDocumentsForCollection() {

            DocumentsService.findAllDocumentsForCollection(vm.collectionId).then(function(response) {
                vm.documents = response;

                vm.keys = {};

                if(response[0]) {
                    for(var k in response[0]) {
                        if(k.indexOf('_', 0) === -1){
                            if(k != "roles") {
                                vm.keys[k] = "";
                            }
                        }
                    }
                }
            });
        }


        function editDocument($index) {

            var name = vm.documents[$index].name;
            var _id = vm.documents[$index]._id;
            vm.document = {_id: _id, name: name};
            toBeUpdatedIndex = $index;
        }

        function addDocument(document) {

            //var doc = {name: document.name, collectionId: vm.collectionId};

            DocumentsService.createDocumentForCollection(vm.collectionId, document).then(function (response) {
                vm.documents.push(response);
                vm.document = {};
            });
        }

        function updateDocument(document) {

            DocumentsService.updateDocumentById(document).then(function (response) {

                if (response === "OK") {

                    //return DocumentsService.findDocumentById(parseInt(document._id));
                    return DocumentsService.findAllDocumentsForCollection(vm.collectionId);
                }
            }).then(function (response) {

                vm.documents = response;
            });
        }

        function deleteDocument($index) {

            var documentId = vm.documents[$index]._id;

            DocumentsService.deleteDocumentById(documentId).then(function (response) {
                    if(response === "OK")
                        return DocumentsService.findAllDocumentsForCollection(vm.collectionId);
                })
                .then(function (response) {
                    vm.documents = response;
                });
        }

        function selectDocument(document) {
            selectDocumentIndex = $scope.documents.indexOf(document);
            $scope.selectedDocument = document._id;
        }
    }

    function slide() {

        var NG_HIDE_CLASS = 'ng-hide';

        return {

            beforeAddClass: function(element, className, done) {

                if(className === NG_HIDE_CLASS) {

                    element.slideUp(done);
                }
            },

            removeClass: function(element, className, done) {

                if(className === NG_HIDE_CLASS) {

                    element.hide().slideDown(done);
                }
            }
        }

    }
})();