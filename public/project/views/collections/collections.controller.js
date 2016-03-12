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

        if($rootScope.loggedUser) {
            var selectCollectionIndex = -1;

            findAllCollectionsForConnection();

            function findAllCollectionsForConnection() {
                console.log("collections controller");

                CollectionsService.findAllCollectionsForConnection($routeParams.id, function (response) {
                    console.log(response);
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
                    console.log(response);
                    $scope.collections.push(response);
                    $scope.collection = {};
                });
            }

            function updateCollection(collection) {
                var conn = {name: collection.name, userId: $routeParams.id, host: collection.host,
                    port: collection.port, username: collection.username, password: collection.password, db: collection.db};
                CollectionsService.updateCollectionById(collection._id, conn, function (response) {
                    console.log(response);
                    $scope.collection = {};
                });
            }

            function deleteCollection($index) {
                var collectionId = $scope.collections[$index]._id;
                CollectionsService.deleteCollectionById(collectionId, function (response) {
                    console.log(response);
                    findAllCollectionsForConnection();
                });
            }

            function selectCollection(collection) {
                console.log(collection);
                selectCollectionIndex = $scope.collections.indexOf(collection);
                console.log(selectCollectionIndex)
                $scope.selectedCollection = collection._id;
            }
        }
        else {
            $location.url("home");
        }
    }
})();
