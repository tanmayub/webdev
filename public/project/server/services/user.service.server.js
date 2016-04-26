/**
 * Created by sudeep on 3/13/16.
 */
"use strict"

module.exports = function(app, userModel) {
    //responds with a single user whose id property is equal to the id path parameter
    app.get("/api/project/admin/user/:id", findUserById);

    function findUserById(req, res) {

        var userId = req.params.id;

        userModel.findUserById(userId)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );
    }
}
