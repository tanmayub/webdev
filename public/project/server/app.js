/**
 * Created by sudeep on 3/24/16.
 */

module.exports = function(app, db, mongoose, mongojs) {

    var userModel = require("./models/user/user.model.js")(db, mongoose);

    var userService = require("./services/user.service.server")(app, userModel);

    var connectionModel = require("./models/connection/connection.model.js")(db, mongoose);

    var connectionService = require("./services/connection.service.server.js")(app, connectionModel);

    var collectionModel = require("./models/collection/collection.model.js")(mongojs, connectionModel);

    var collectionService = require("./services/collection.service.server.js")(app, collectionModel);

    var documentModel = require("./models/document/document.model.js")(mongojs, connectionModel);

    var documentService = require("./services/document.service.server.js")(app, documentModel);

}
