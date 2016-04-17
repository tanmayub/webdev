/**
 * Created by TanmayPC on 3/24/2016.
 */

module.exports = function(app, collectionModel) {
    //creates a new collection whose properties are the same as the connection object embedded in the HTTP request's body and
    //the collection belongs to a user whose id is equal to the userId path parameter.
    //The collection object's id is initially null since it is a new record.
    // The id of the new connection should be set dynamically using Node.js guid or node-uuid libraries.
    // These will eventually be set by the database when they are inserted into a collection
    app.post("/api/project/connection/:connId/collection", createCollection);

    //returns an array of collections belonging to a user whose id is equal to the userId path parameter
    app.get("/api/project/connection/:connId/collection", findAllCollectionsForConnection);


    app.get("/api/project/connection/:connId/set", setConnectionIdInModel);

    //returns a collection object whose id is equal to the collectionId path parameter
    app.get("/api/project/collection/:collectionId", findCollectionById);

    //updates a collection object whose id is equal to the collectionId path parameter so that its properties are the same as
    //the property values of the collection object embedded in the request's body
    app.put("/api/project/collection/:collectionName", updateCollectionById);

    //removes a collection object whose id is equal to the collectionId path parameter
    app.delete("/api/project/collection/:collectionId", deleteCollectionById);
    
    function setConnectionIdInModel(req, res) {
        var connId = req.params.connId;

        collectionModel.setConnectionId(connId);

        res.send(200);
    }

    function createCollection (req, res) {

        var collection = req.body;

        collectionModel.createCollection(collection.collection).then(

            function (response) {

                if(response) {

                    res.json(200);
                }

            }
        );

    }

    function findAllCollectionsForConnection(req, res) {

       collectionModel.findAllCollectionsForConnection().then(
           
           function (collections) {

               if(collections) {
                   res.json(collections);
               }
           }
       );
    }

    function findCollectionById(req, res) {

        var colId = parseInt(req.params.collectionId);

        res.json(collectionModel.findCollectionById(colId));
    }

    function updateCollectionById(req, res) {

        var colName = req.params.collectionName;
        var collection = req.body;

        //console.log(collection);

        /*collectionModel.updateCollectionById(colId, collection);

        res.send(200);*/
        collectionModel.updateCollectionById(colName, collection)
            .then(function(response) {
                if(response) {
                    res.send(200);
                }
            });
    }

    function deleteCollectionById(req, res) {

        var collName = req.params.collectionId;

        collectionModel.deleteCollectionById(collName);

        res.send(200);
    }
}