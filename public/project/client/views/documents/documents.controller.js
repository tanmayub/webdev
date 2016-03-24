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

        function findAllDocumentsForCollection() {
            
            DocumentsService.findAllDocumentsForCollection(parseInt($routeParams.id), function (response) {
                $scope.documents = response;
            });
        }

        function editDocument($index) {

            var name = $scope.documents[$index].name;
            var _id = $scope.documents[$index]._id;
            $scope.document = {_id: _id, name: name};
        }

        function addDocument(document) {

            var doc = {name: document.name, collectionId: parseInt($routeParams.id)};

            DocumentsService.createDocumentForCollection(parseInt($routeParams.id), doc, function (response) {

                findAllDocumentsForCollection();
                $scope.document = {};

            });
        }

        function updateDocument(document) {

            var doc = {name: document.name, collectionId: parseInt($routeParams.id)};

            DocumentsService.updateDocumentById(parseInt(document._id), doc, function (response) {
                $scope.document = {};
                findAllDocumentsForCollection();
            });
        }

        function deleteDocument($index) {

            var documentId = $scope.documents[$index]._id;

            DocumentsService.deleteDocumentById(documentId, function (response) {
                findAllDocumentsForCollection();
            });

        }

        function selectDocument(document) {
            selectDocumentIndex = $scope.documents.indexOf(document);
            $scope.selectedDocument = document._id;
        }

        if($rootScope.loggedUser) {
            var selectDocumentIndex = -1;

            findAllDocumentsForCollection();
        }
        else {
            $location.url("home");
        }
    }
})();
