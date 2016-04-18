/**
 * Created by TanmayPC on 3/25/2016.
 */


module.exports = function(app, documentModel) {
    //creates a new connection whose properties are the same as the connection object embedded in the HTTP request's body and
    //the connection belongs to a user whose id is equal to the userId path parameter.
    //The connection object's id is initially null since it is a new record.
    // The id of the new connection should be set dynamically using Node.js guid or node-uuid libraries.
    // These will eventually be set by the database when they are inserted into a collection
    app.post("/api/project/collection/:collectionId/document", createDocument);

    //returns an array of connections belonging to a user whose id is equal to the userId path parameter
    app.get("/api/project/collection/:collectionId/document", findAllDocumentsForCollection);

    //returns a connection object whose id is equal to the connectionId path parameter
    app.get("/api/project/collection/document/:documentId", findDocumentById);

    //returns a connection object whose id is equal to the connectionId path parameter
    app.get("/api/project/connection/:connectionId/collection/:collectionId/config", configCollection);

    //updates a connection object whose id is equal to the connectionId path parameter so that its properties are the same as
    //the property values of the connection object embedded in the request's body
    app.put("/api/project/collection/document/:documentId", updateDocumentById);

    //removes a connection object whose id is equal to the connectionId path parameter
    app.delete("/api/project/collection/document/:documentId", deleteDocumentById);

    function createDocument (req, res) {

        var document = req.body;
        var collectionId = req.params.collectionId;
        document.collectionId = collectionId;
        /*var documentIns = documentModel.createDocumentForCollection(document);
        res.json(documentIns);*/
        documentModel.createDocumentForCollection(document)
            .then(function(doc) {
                res.json(doc);
            });
    }

    function configCollection(req, res) {

        var collectionName = req.params.collectionId;
        var connectionId = req.params.connectionId;

        documentModel.setConfig(connectionId, collectionName);

        res.send(200);
    }

    function findAllDocumentsForCollection(req, res) {
        var collectionId = parseInt(req.params.collectionId);

        documentModel.findAllDocumentsForCollection(collectionId)
            .then(function(documents) {
                if(documents) {
                    res.json(documents);
                }
            });
    }

    function findDocumentById(req, res) {
        var documentId = parseInt(req.params.documentId);
        res.json(documentModel.findDocumentById(documentId));
    }

    function updateDocumentById(req, res) {
        var documentId = req.params.documentId;
        var document = req.body;

        documentModel.updateDocumentById(documentId, document)
            .then(function(doc) {
                res.send(200);
            });
    }

    function deleteDocumentById(req, res) {
        var documentId = req.params.documentId;
        documentModel.deleteDocumentById(documentId)
            .then(function(doc) {
                res.send(200);
            });
    }
}