/**
 * Created by TanmayPC on 3/19/2016.
 */

var q = require("q");

module.exports = function (formModel, db, mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);

    //var FieldModel = mongoose.model('form', FieldSchema);

    var api = {
        createField: createField,
        deleteField: deleteField,
        findField: findField,
        updateField: updateField,
        findFieldsByFormId: findFieldsByFormId
    };

    return api;

    function createField(formId, field) {
        //field._id = parseInt(Math.floor(Math.random()*900) + 100);
        formModel.findFormById(formId)
            .then(function(doc) {
                var fields = doc[0].fields;
                fields.push(field);
                doc[0].fields = fields;
                /*formModel.updateFormById(formId, doc[0])
                    .then(function(doc) {
                        return doc;
                    })*/
                doc[0].save();
        });
        //form.fields.push(field);
    }

    function deleteField(formId, fieldId) {
        /*var form;
        var fields;
        fields = form.fields;*/
        formModel.findFormById(formId)
            .then(function(doc) {
                var fields = doc[0].fields;
                //console.log(fields);
                for (var f in fields) {
                    //console.log(fields[f]._id == fieldId);
                    if (fields[f]._id == fieldId) {
                        fields.splice(f, 1);
                    }
                }
                doc[0].fields = fields;
                //console.log(doc);
                formModel.updateFormById(formId, doc[0])
                    .then(function(doc) {
                        return doc;
                    })
            });
    }

    function findField(formId, fieldId) {
        /*var form;
        var fields;
        form = formModel.findFormById(formId);*/
        formModel.findFormById(formId)
            .then(function(doc) {
                var fields = doc[0].fields;
                for (var f in fields) {
                    if (fields[f]._id == fieldId) {
                        return fields[f];
                    }
                }
            });
    }

    function findFieldsByFormId(formId) {
        /*var form;
        console.log(formId);
        form = formModel.findFormById(formId);*/
        var deferred = q.defer();
        formModel.findFormById(formId)
            .then(function(doc) {
                //console.log(doc[0]);
                deferred.resolve(doc[0].fields);
            });

        return deferred.promise;
        /*console.log(form);
        return form.fields;*/
    }

    function updateField(formId, fieldId, field) {
        /*var form;
        var fields;
        form = formModel.findFormById(formId);
        fields = form.fields;*/
        var deferred = q.defer();

        formModel.findFormById(formId)
            .then(function(doc) {
                var fields = doc[0].fields;
                for (var f in fields) {
                    if (fields[f]._id == fieldId) {
                        fields[f] = field;
                    }
                }
                doc[0].fields = fields;
                formModel.updateFormById(formId, doc[0])
                    .then(function(doc) {
                        //deferred.resolve(doc);
                        return doc;
                    })
            });
        //return deferred.promise;
    }

};
