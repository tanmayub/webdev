(function () {
    angular
        .module("FormBuilderApp")
        .controller("CollectionsController", collectionsController);

    function collectionsController($rootScope, CollectionsService, $routeParams) {
        var vm = this;

        vm.findAllCollectionsForConnection = findAllCollectionsForConnection;
        vm.updateCollection = updateCollection;
        vm.addCollection = addCollection;
        vm.deleteCollection = deleteCollection;
        vm.selectCollection = selectCollection;
        vm.editCollection = editCollection;

        var connectionId = parseInt($routeParams.id);
        var toBeUpdatedIndex;
        init();

        function init() {
            findAllCollectionsForConnection();
            toBeUpdatedIndex = -1;
        }

        function findAllCollectionsForConnection() {

            CollectionsService.findAllCollectionsForConnection(connectionId).then(function(response) {
                vm.collections = response;
            });
        }

        function editCollection($index) {
            var name = vm.collections[$index].name;
            var _id = vm.collections[$index]._id;
            vm.collection = {_id: _id, name: name};

            toBeUpdatedIndex = $index;
        }

        function addCollection(collection) {
            var col = {name: collection.name};
            CollectionsService.createCollectionForUser(connectionId, col).then(function (response) {
                vm.collections.push(response);
                vm.collection = {};
            });
        }

        function updateCollection(collection) {
            var col = {name: collection.name, connId: connectionId};
            CollectionsService.updateCollectionById(collection._id, col).then(function (response) {
                    if (response === "OK") {
                        return CollectionsService.findCollectionById(collection._id);
                    }
                })
                .then(function (response) {
                    //console.log(response);
                    vm.collections[toBeUpdatedIndex] = response;
                    vm.collection = {};
                });
        }

        function deleteCollection($index) {
            var collectionId = vm.collections[$index]._id;
            CollectionsService.deleteCollectionById(collectionId).then(function (response) {
                    if(response === "OK")
                        return CollectionsService.findAllCollectionsForConnection(connectionId);
                })
                .then(function (response) {
                    vm.collections = response;
                });
        }

        function selectCollection(collection) {
            selectCollectionIndex = vm.collections.indexOf(collection);
            vm.selectedCollection = collection._id;
        }
    }
})();
