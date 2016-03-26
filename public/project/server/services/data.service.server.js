/**
 * Created by TanmayPC on 3/25/2016.
 */


module.exports = function(app, dataModel) {
    //creates a new connection whose properties are the same as the connection object embedded in the HTTP request's body and
    //the connection belongs to a user whose id is equal to the userId path parameter.
    //The connection object's id is initially null since it is a new record.
    // The id of the new connection should be set dynamically using Node.js guid or node-uuid libraries.
    // These will eventually be set by the database when they are inserted into a document
    app.post("/api/project/document/:documentId/data", createData);

    //returns an array of connections belonging to a user whose id is equal to the userId path parameter
    app.get("/api/project/document/:documentId/data", findAllDataForDocument);

    //updates a connection object whose id is equal to the connectionId path parameter so that its properties are the same as
    //the property values of the connection object embedded in the request's body
    app.put("/api/project/document/:documentId/data", updateDataByName);

    //removes a connection object whose id is equal to the connectionId path parameter
    app.delete("/api/project/document/:documentId/data/:name", deleteDataByName);

    function createData (req, res) {

        var data = req.body;
        var documentId = parseInt(req.params.documentId);
        var updatedDoc = dataModel.createDocumentProp(documentId, data);

        res.json(updatedDoc);
    }

    function findAllDataForDocument(req, res) {

        var documentId = parseInt(req.params.documentId);

        var data = dataModel.getProperties(documentId);

        res.json(data);
    }

    function updateDataByName(req, res) {

        var documentId = parseInt(req.params.documentId);
        var prop = req.body;

        dataModel.updateProperty(documentId, prop);

        res.send(200);

    }

    function deleteDataByName(req, res) {

        var documentId = parseInt(req.params.documentId);
        var propName = req.params.name;

        dataModel.deleteProperty(documentId, propName);

        res.send(200);
    }
}