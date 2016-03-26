/**
 * Created by TanmayPC on 3/25/2016.
 */
var documents = require("./document.mock.json");

module.exports = function() {

    var api = {

        getProperties: getAllProperties,
        createDocumentProp: createDocumentProp,
        deleteProperty: deleteProperty,
        updateProperty: updateProperty
    };
    return api;


    function getAllProperties(documentId) {

        var prop = [];
        var doc = null;

        for (var i in documents) {

            if (documents[i]._id === documentId) {

                doc = documents[i];
                
                break;
            }
        }

        for(var p in doc) {

            if(p != "_id" && p != "name" && p != "collectionId" && p!= "$$hashKey") {

                prop.push(p);
            }
        }

        return prop;
    }

    function createDocumentProp(docId, prop) {

        for(var i in documents) {

            if (documents[i]._id === docId) {

                documents[i][prop.name] = prop.value;

                return documents[i];
            }
        }
    }

    function deleteProperty(docId, propName) {

        for(var i in documents) {

            if(documents[i]._id === docId) {

                delete documents[i][propName];

                return documents[i];
            }
        }
    }

    function updateProperty(docId, prop) {

        for(var i in documents) {

            if (documents[i]._id === docId) {

                documents[i][prop.name] = prop.value;

                return documents[i];

            }
        }
    }
}