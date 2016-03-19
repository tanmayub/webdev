/**
 * Created by TanmayPC on 3/18/2016.
 */
var users = require("./user.mock.json");

module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function findUserByCredentials(credentials) {
        console.log(users);
        console.log(credentials);

        for(var u in users) {
            if(users[u].password === credentials.password &&
               users[u].username === credentials.username) {
                return users[u];
            }
        }
    }
}