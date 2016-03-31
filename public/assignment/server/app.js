/**
 * Created by TanmayPC on 3/17/2016.
 */
module.exports = function(app, db, mongoose) {
    //console.log(mongoose);
    var userModel = require("./models/user.model.js")(db, mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel);

    var formModel = require("./models/form.model.js")(db, mongoose);
    var formService = require("./services/form.service.server.js")(app, formModel);

    var fieldModel = require("./models/field.model.js")(formModel, db, mongoose);
    var fieldService = require("./services/field.service.server.js")(app, formModel, fieldModel);
}