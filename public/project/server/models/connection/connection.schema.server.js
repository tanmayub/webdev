/**
 * Created by TanmayPC on 3/31/2016.
 */

module.exports = function(mongoose) {
    var ConnectionSchema = mongoose.Schema({
        name: String,
        dbname: String,
        host: String,
        port: Number,
        username: String,
        password: String,
        userId: Number,
        connectionString: String
    }, {collection: 'project.connection'});

    return ConnectionSchema;
}