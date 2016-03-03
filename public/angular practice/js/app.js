/**
 * Created by TanmayPC on 2/17/2016.
 */

(function(){
    angular
        .module("pracApp",[])
        .controller("movieListController", movieListController);

    function movieListController($scope, $http){
        $http.get("http://www.omdbapi.com/?s=Star Wars")
            .success(function(response){
                console.log(response);
                $scope.movies = response.Search;
            });
    }
})();