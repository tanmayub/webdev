/**
 * Created by TanmayPC on 2/19/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/landing", {
                templateUrl: "application.html",
                controller: "MainController",
            })
            .when("/home", {
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController",
            })
            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/connection", {
                templateUrl: "client/views/connections/connections.view.html",
                controller: "ConnectionsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/share", {
                templateUrl: "client/views/users/share-connection.view.html",
                controller: "ShareController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/collections/:id", {
                templateUrl: "client/views/collections/collections.view.html",
                controller: "CollectionsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/connection/:connectionId/collection/:id/document", {
                templateUrl: "client/views/documents/documents.view.html",
                controller: "DocumentsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/data/:id", {
                templateUrl: "client/views/data/data.view.html",
                controller: "DataController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home",
                controller: "MainController"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService.getCurrentUser().then(function (response) {

            var currentUser = response.data;

            if (currentUser) {

                UserService.setCurrentUser(currentUser);
                deferred.resolve();

            } else {

                deferred.reject();
                $location.url("/home");
            }
        });

        return deferred.promise;
    }
})();