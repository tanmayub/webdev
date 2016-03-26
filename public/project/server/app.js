/**
 * Created by sudeep on 3/24/16.
 */

module.exports = function(app, uuid) {

    var connectionModel = require("./models/connection/connection.model.js")();
    
    var connectionService = require("./services/connection.service.server.js")(app, connectionModel, uuid);
    
    var collectionModel = require("./models/collection/collection.model.js")();

    var collectionService = require("./services/collection.service.server.js")(app, collectionModel, uuid);

    var documentModel = require("./models/document/document.model.js")();

    var documentService = require("./services/document.service.server.js")(app, documentModel, uuid);

    var dataModel = require("./models/document/data.model.js")();
    
    var dataService = require("./services/data.service.server")(app, dataModel);

}
