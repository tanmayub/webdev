/**
 * Created by TanmayPC on 2/19/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController(UserService, $location, $rootScope){
        var vm = this;
        vm.findUserByCredentials = findUserByCredentials;
        vm.message = null;

        function findUserByCredentials(user) {
            if(!user) {
                return;
            }
            /*UserService.findUserByCredentials(user.username, user.pwd)
                .then(function(response){
                    console.log(response);
                    if(response) {
                        $rootScope.currentUser = response;
                        $location.url("/profile");
                    }
                    else{
                        vm.message="Username and password doesnot match";
                    }
                });*/
            //console.log(user);
            UserService.login(user).then(function(response) {
                //console.log(response);
                if(response) {
                    if(response.data) {
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                    }
                }
                else{
                    vm.message="Username and password doesn't match";
                }
            });
        }
    }
})();