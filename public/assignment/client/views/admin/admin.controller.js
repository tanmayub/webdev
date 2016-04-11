/**
 * Created by TanmayPC on 2/19/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController(UserService, $rootScope, $location) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.addUser = addUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.editUser = editUser;

        if($rootScope.currentUser) {
            //findAllUsers();
            var selectUserIndex = -1;
            init();

            function init() {
                UserService.findAllUsers($rootScope.currentUser).then(function (response) {
                    console.log(response);
                    vm.users = response;
                });
                selectUserIndex = -1;
            }
        }
        else {
            $location.url("home");
        }

        function addUser(user) {
            var user = {_id: user._id, username: user.username, password: user.password, roles: user.roles};
            UserService.createUser(user)
                .then(function(response) {
                    vm.users.push(response);
            });
            vm.user = {};
        }

        function editUser() {
            var userToEdit = vm.users[selectUserIndex];
            vm.user = {username: userToEdit.username, password: "", roles: userToEdit.roles.join(',')};
        }

        function updateUser(user) {
            if (selectUserIndex > -1) {
                var userId = vm.users[selectUserIndex]._id;
                var usr = vm.users[selectUserIndex];
                usr.roles = user.roles.split(',');
                UserService.updateUser(userId, usr)
                    .then(function (response) {
                        if (response) {
                            //console.log(response);
                            //vm.users[selectUserIndex] = response;
                            init();
                            vm.user = {};
                        }
                    });
                vm.user={};
            }
        }

        function deleteUser() {
            var userId = vm.users[selectUserIndex]._id;
            UserService.deleteUserById(userId).then(function(response) {
                if(response.ok === 1) {
                    init();
                }
            });
        }

        function selectUser(user) {
            //console.log(users);
            selectUserIndex = vm.users.indexOf(user);
            vm.selectedUser = user._id;
        }
    }
})();