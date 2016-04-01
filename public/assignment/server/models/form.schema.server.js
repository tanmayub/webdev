/**
 * Created by TanmayPC on 3/31/2016.
 */
module.exports = function(mongoose) {
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        created: Date,
        updated: Date
        //fields: [String]
    }, {collection: 'form'});

    return FormSchema;
}