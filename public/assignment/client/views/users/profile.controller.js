/**
 * Created by TanmayPC on 2/19/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;

        function init() {
            vm.user= {};
            if($rootScope.currentUser.data) {
                //console.log($rootScope.currentUser.data);
                vm.user = $rootScope.currentUser.data;
            }
            else {
                if ($rootScope.currentUser) {
                    //console.log($rootScope.currentUser);
                    vm.user = $rootScope.currentUser;
                }
            }

        }
        init();

        function updateUser(user) {
            UserService.updateUser($rootScope.currentUser._id, user).then(updateProfilePage);
        }

        function updateProfilePage(response) {
            if (response) {
                //console.log(response);
                UserService.findUserById($rootScope.currentUser._id).then (function (updatedUser) {
                    vm.user.username = updatedUser.username;
                    vm.user.firstName = updatedUser.firstName;
                    vm.user.lastName = updatedUser.lastName;
                    vm.user.email = updatedUser.email;
                    vm.user.phone = updatedUser.phone;
                    $rootScope.currentUser = updatedUser;
                });
            }
        }
    }
})();