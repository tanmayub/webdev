(function () {
    angular
        .module("FormBuilderApp")
        .controller("CollectionsController", collectionsController);

    function collectionsController(CollectionsService, $routeParams) {
        var vm = this;

        vm.findAllCollectionsForConnection = findAllCollectionsForConnection;
        vm.updateCollection = updateCollection;
        vm.addCollection = addCollection;
        vm.deleteCollection = deleteCollection;
        vm.selectCollection = selectCollection;
        vm.editCollection = editCollection;

        var connectionId = $routeParams.id;
        vm.connectionId = connectionId;
        var toBeUpdatedIndex;
        var oldCollectionName;
        init();

        function init() {
            CollectionsService.setConnectionId(connectionId).then(

                function (response) {

                    if(response === "OK") {
                        findAllCollectionsForConnection();
                    }
                }
            );

            toBeUpdatedIndex = -1;
            oldCollectionName = "";
        }

        function findAllCollectionsForConnection() {

            CollectionsService.findAllCollectionsForConnection(connectionId).then(function(response) {
                vm.collections = response;
            });
        }

        function editCollection($index) {
            var name = vm.collections[$index];
            //var _id = vm.collections[$index]._id;
            vm.collection = name;
            oldCollectionName = name;

            toBeUpdatedIndex = $index;
        }

        function addCollection(collection) {

            CollectionsService.createCollectionForUser(connectionId, {collection: collection})

                .then(function (response) {

                    return  CollectionsService.findAllCollectionsForConnection(connectionId);
                })

                .then(function(response) {

                    vm.collections = response;
                });
            vm.collection = "";
        }

        function updateCollection(collection) {
            var col = {collection: collection};
            CollectionsService.updateCollectionById(oldCollectionName, col).then(function (response) {
                    if (response === "OK") {
                        return CollectionsService.findAllCollectionsForConnection(connectionId);
                    }
                })
                .then(function (response) {
                    vm.collections = response;
                    vm.collection = "";
                    oldCollectionName = "";
                });
        }

        function deleteCollection($index) {
            var collName = vm.collections[$index];
            CollectionsService.deleteCollectionById(collName).then(function (response) {
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
