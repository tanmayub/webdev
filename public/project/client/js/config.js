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
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                controller: "RegController"
            })
            .when("/connection", {
                templateUrl: "client/views/connection/connection.view.html",
                controller: "ConnectionsController"
            })
            .when("/collections/:id", {
                templateUrl: "client/views/collections/collections.view.html",
                controller: "CollectionsController"
            })
            .when("/documents/:id", {
                templateUrl: "client/views/documents/documents.view.html",
                controller: "DocumentsController"
            })
            .when("/data/:id", {
                templateUrl: "client/views/data/data.view.html",
                controller: "DataController"
            })
            .otherwise({
                redirectTo: "/home",
                controller: "HomeController"
            });
    }
})();