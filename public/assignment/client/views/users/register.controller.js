/**
 * Created by TanmayPC on 2/19/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegController", regController);

    function regController(UserService, $rootScope, $location) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(user) {
            var userSave = {username: user.username, password: user.password, lastName: "",
                firstName: "", email: user.email }
            UserService.createUser(userSave).then(function(users) {
                //console.log(users);
                $rootScope.currentUser = users;
                $location.url("/profile");
                /*UserService.findUserByUsername(userSave.username).then(function (newUser) {
                    console.log(newUser);
                    $rootScope.currentUser = newUser;
                    $location.url("/profile");
                });*/
            });
        }
    }
})();