/**
 * Created by TanmayPC on 3/18/2016.
 */
"use strict"

var mock = require("./form.mock.json");

var q = require("q");

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);

    var FormModel = mongoose.model('form', FormSchema);

    var api = {

        //Form methods
        createForm: createForm,
        findFormById: findFormById,
        findAllForms: findAllForms,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
        findAllFormsByUserId: findAllFormsByUserId,
    };
    return api;

    function createForm(form) {
        //mock.push(form);
        var deferred = q.defer();
        var existingForm = findFormByTitle(form.title);
        if(existingForm) {
            FormModel.create(form, function (err, doc) {
                //console.log("create: " + doc);
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });
        }
        else {
            deferred.resolve(existingForm);
        }
        return deferred.promise;
    }

    function findFormById(formId) {
        /*for (var i in mock) {
            //console.log(mock[i]._id === parseInt(formId));
            if(mock[i]._id === parseInt(formId)) {
                //console.log(mock[i]);
                return mock[i];
            }
        }
        //console.log("not found");
        return null;*/

        //console.log(formId);
        var deferred = q.defer();
        FormModel.find({_id: formId}, function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                //console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllForms() {
        //return mock;
        var deferred = q.defer();
        FormModel.find(function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId, form) {
        /*for (var i in mock) {
            if(mock[i]._id === formId) {
                mock[i].title = form.title;
                return mock[i];
            }
        }
        return mock;*/
        var deferred = q.defer();
        FormModel.update({_id: formId}, form, function(err, doc) {
            if(err) {
                //console.log(err);
                deferred.reject(err);
            }
            else {
                //console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteFormById(formId) {
        /*for (var i in mock) {
            if (mock[i]._id === formId) {
                mock.splice(i,1);
                break;
            }
        }
        return mock;*/

        var deferred = q.defer();
        //console.log(userId);
        FormModel.remove({_id: formId}, function(err, doc) {
            if(err) {
                //console.log(err);
                deferred.reject(err);
            }
            else {
                //console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(formTitle) {
        /*for (var i in mock) {
            if (mock[i].title === formTitle) {
                return mock[i];
            }
        }
        return null;*/
        var deferred = q.defer();
        FormModel.find(formTitle, function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc[0]);
            }
        });
        return deferred.promise;
    }

    function findAllFormsByUserId(userId) {
        /*var forms = [];
        for (var i in mock) {
            if (mock[i].userId === userId) {
                forms.push(mock[i]);
            }
        }
        return forms;*/
        var deferred = q.defer();
        return FormModel.find({userId: userId}, function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
}