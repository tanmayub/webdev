/**
 * Created by TanmayPC on 3/25/2016.
 */


module.exports = function(app, documentModel, uuid) {
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

    //updates a connection object whose id is equal to the connectionId path parameter so that its properties are the same as
    //the property values of the connection object embedded in the request's body
    app.put("/api/project/collection/document/:documentId", updateDocumentById);

    //removes a connection object whose id is equal to the connectionId path parameter
    app.delete("/api/project/collection/document/:documentId", deleteDocumentById);

    function createDocument (req, res) {

        var document = req.body;
        var collectionId = parseInt(req.params.collectionId);
        document.collectionId = collectionId;
        document._id = parseInt(uuid.v4(), 16);
        var documentIns = documentModel.createDocumentForCollection(document);
        res.json(documentIns);
    }

    function findAllDocumentsForCollection(req, res) {
        var collectionId = parseInt(req.params.collectionId);
        res.json(documentModel.findAllDocumentsForCollection(collectionId));
    }

    function findDocumentById(req, res) {
        var documentId = parseInt(req.params.documentId);
        res.json(documentModel.findDocumentById(documentId));
    }

    function updateDocumentById(req, res) {
        var documentId = parseInt(req.params.documentId);
        var document = req.body;
        documentModel.updateDocumentById(documentId, document);
        res.send(200);
    }

    function deleteDocumentById(req, res) {
        var documentId = parseInt(req.params.documentId);
        documentModel.deleteDocumentById(documentId);
        res.send(200);
    }
}