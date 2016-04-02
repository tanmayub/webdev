/**
 * Created by TanmayPC on 4/1/2016.
 */
module.exports = function(mongoose) {
    var FieldSchema = mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: [{label: String, value: String}]
    });

    return FieldSchema;
}