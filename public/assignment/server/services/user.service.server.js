/**
 * Created by TanmayPC on 3/18/2016.
 */
"use strict"

module.exports = function(app, userModel) {

    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/admin/user/:id", findUserById);

    function findUserById(req, res) {
        var userId = req.params.id;
        //res.json(userModel.findUserById(userId));

        userModel.findUserById(userId)
            .then(function(doc) {
                //console.log(doc);
                res.json(doc);
            },
            function(err) {
                res.status(400).send(err);
            });
    }
}