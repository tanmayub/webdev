/**
 * Created by TanmayPC on 3/31/2016.
 */
module.exports = function(mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        created: Date,
        updated: Date,
        fields: [FieldSchema]
    }, {collection: 'form'});

    return FormSchema;
}