/**
 * Created by TanmayPC on 3/17/2016.
 */
module.exports = function (app) {
    /*var userModel = require("./models/user.model.server.js")(app);*/
    var model = require("./models/user.model.server.js")();
    var service = require("./services/user.service.server.js")(app, model);
}