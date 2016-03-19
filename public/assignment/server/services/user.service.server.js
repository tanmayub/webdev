/**
 * Created by TanmayPC on 3/18/2016.
 */
module.exports = function(app, model) {
    app.get("/api/assignment/username=:username&password=:password", findUserByCredentials);

    function findUserByCredentials(req, res) {
        var username = req.param("username");
        var password = req.param("password");
        var credentials = {username: username, password: password};
        console.log(credentials);
        var user = model.findUserByCredentials(credentials);
        res.json(user);
    }
}