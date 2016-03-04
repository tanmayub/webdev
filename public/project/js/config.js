/**
 * Created by TanmayPC on 2/19/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegController"
            })
            .when("/connections", {
                templateUrl: "views/connections/connections.view.html",
                controller: "ConnectionsController"
            })
            .when("/collections/:id", {
                templateUrl: "views/collections/collections.view.html",
                controller: "CollectionsController"
            })
            .when("/documents/:id", {
                templateUrl: "views/documents/documents.view.html",
                controller: "DocumentsController"
            })
            .when("/data/:id", {
                templateUrl: "views/data/data.view.html",
                controller: "DataController"
            })
            .otherwise({
                redirectTo: "/home",
                controller: "HomeController"
            });
    }
})();