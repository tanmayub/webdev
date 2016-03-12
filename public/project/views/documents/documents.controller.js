/**
 * Created by sudeep on 3/4/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("DocumentsController", documentsController);

    function documentsController($scope, $routeParams, DocumentsService, $location, $rootScope) {
        $scope.findAllDocumentsForCollection = findAllDocumentsForCollection;
        $scope.updateDocument = updateDocument;
        $scope.addDocument = addDocument;
        $scope.deleteDocument = deleteDocument;
        $scope.selectDocument = selectDocument;
        $scope.editDocument = editDocument;

        if($rootScope.loggedUser) {
            var selectDocumentIndex = -1;

            findAllDocumentsForCollection();

            function findAllDocumentsForCollection() {
                DocumentsService.findAllDocumentsForCollection($routeParams.id, function (response) {
                    $scope.documents = response;
                });
            }

            function editDocument($index) {
                var name = $scope.documents[$index].name;
                var _id = $scope.documents[$index]._id;
                $scope.document = {_id: _id, name: name};
            }

            function addDocument(document) {
                var doc = {name: document.name, collectionId: $routeParams.id};
                DocumentsService.createDocumentForCollection($routeParams.id, doc, function (response) {
                    console.log(response);
                    $scope.documents.push(response);
                    $scope.document = {};
                });
            }

            function updateDocument(document) {
                var doc = {name: document.name, collectionId: $routeParams.id};
                DocumentsService.updateDocumentById(document._id, doc, function (response) {
                    console.log(response);
                    $scope.document = {};
                    findAllDocumentsForCollection();
                });
            }

            function deleteDocument($index) {
                var documentId = $scope.documents[$index]._id;
                DocumentsService.deleteDocumentById(documentId, function (response) {
                    console.log(response);
                    findAllDocumentsForCollection();
                });
            }

            function selectDocument(document) {
                console.log(document);
                selectDocumentIndex = $scope.documents.indexOf(document);
                console.log(selectDocumentIndex)
                $scope.selectedDocument = document._id;
            }
        }
        else {
            $location.url("home");
        }
    }
})();
