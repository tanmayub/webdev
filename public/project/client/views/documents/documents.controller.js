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

        var collectionId = $routeParams.id;
        var connectionId = $routeParams.connectionId;
        var toBeUpdatedIndex;

        function init() {
            if($rootScope.loggedUser) {
                //findAllDocumentsForCollection();
                DocumentsService.configCollection(connectionId, collectionId).then(function(response) {

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
            
            DocumentsService.findAllDocumentsForCollection(collectionId).then(function(response) {
                vm.documents = response;
            });
        }


        function editDocument($index) {

            var name = vm.documents[$index].name;
            var _id = vm.documents[$index]._id;
            vm.document = {_id: _id, name: name};
            toBeUpdatedIndex = $index;
        }

        function addDocument(document) {

            var doc = {name: document.name, collectionId: collectionId};

            DocumentsService.createDocumentForCollection(collectionId, doc).then(function (response) {
                vm.documents.push(response);
                vm.document = {};
            });
        }

        function updateDocument(document) {

            var doc = {name: document.name, collectionId: collectionId};

            DocumentsService.updateDocumentById(parseInt(document._id), doc).then(function (response) {

                if (response === "OK") {

                    return DocumentsService.findDocumentById(parseInt(document._id));
                }
            }).then(function (response) {

                vm.documents[toBeUpdatedIndex] = response;
                vm.document = {};
            });
        }

        function deleteDocument($index) {

            var documentId = vm.documents[$index]._id;

            DocumentsService.deleteDocumentById(documentId).then(function (response) {
                    if(response === "OK")
                        return DocumentsService.findAllDocumentsForCollection(collectionId);
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
