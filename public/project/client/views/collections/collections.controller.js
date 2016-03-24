(function () {
    angular
        .module("FormBuilderApp")
        .controller("CollectionsController", collectionsController);

    function collectionsController($scope, $rootScope, CollectionsService, $location, $routeParams) {
        $scope.findAllCollectionsForConnection = findAllCollectionsForConnection;
        $scope.updateCollection = updateCollection;
        $scope.addCollection = addCollection;
        $scope.deleteCollection = deleteCollection;
        $scope.selectCollection = selectCollection;
        $scope.editCollection = editCollection;

        function findAllCollectionsForConnection() {

            CollectionsService.findAllCollectionsForConnection($routeParams.id, function (response) {
                $scope.collections = response;
            });
        }

        function editCollection($index) {
            var name = $scope.collections[$index].name;
            var _id = $scope.collections[$index]._id;
            $scope.collection = {_id: _id, name: name};
        }

        function addCollection(collection) {
            var conn = {name: collection.name, userId: $routeParams.id, host: collection.host,
                port: collection.port, username: collection.username, password: collection.password, db: collection.db};
            CollectionsService.createCollectionForUser($routeParams.id, conn, function (response) {
                $scope.collections.push(response);
                $scope.collection = {};
            });
        }

        function updateCollection(collection) {
            var conn = {name: collection.name, userId: $routeParams.id, host: collection.host,
                port: collection.port, username: collection.username, password: collection.password, db: collection.db};
            CollectionsService.updateCollectionById(collection._id, conn, function (response) {
                $scope.collection = {};
            });
        }

        function deleteCollection($index) {
            var collectionId = $scope.collections[$index]._id;
            CollectionsService.deleteCollectionById(collectionId, function (response) {
                findAllCollectionsForConnection();
            });
        }

        function selectCollection(collection) {
            selectCollectionIndex = $scope.collections.indexOf(collection);
            $scope.selectedCollection = collection._id;
        }

        if($rootScope.loggedUser) {
            var selectCollectionIndex = -1;

            findAllCollectionsForConnection();


        }
        else {
            $location.url("home");
        }
    }
})();
