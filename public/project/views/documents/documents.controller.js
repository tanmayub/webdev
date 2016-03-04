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

            function editDocument() {
                var name = $scope.documents[selectDocumentIndex].name;
                $scope.document = {name: name};
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
                if (selectDocumentIndex > -1) {
                    var documentId = $scope.documents[selectDocumentIndex]._id;
                    var doc = {name: document.name, collectionId: $routeParams.id};
                    DocumentsService.updateDocumentById(documentId, doc, function (response) {
                        $scope.document = {};
                        findAllDocumentsForCollection();
                    });
                }
            }

            function deleteDocument() {
                var documentId = $scope.documents[selectDocumentIndex]._id;
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
