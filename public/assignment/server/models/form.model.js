/**
 * Created by TanmayPC on 3/18/2016.
 */
"use strict"

var mock = require("./form.mock.json");

module.exports = function(db, mongoose) {
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
        mock.push(form);
    }

    function findFormById(formId) {
        for (var i in mock) {
            //console.log(mock[i]._id === parseInt(formId));
            if(mock[i]._id === parseInt(formId)) {
                //console.log(mock[i]);
                return mock[i];
            }
        }
        //console.log("not found");
        return null;
    }

    function findAllForms() {
        return mock;
    }

    function updateFormById(formId, form) {
        for (var i in mock) {
            if(mock[i]._id === formId) {
                mock[i].title = form.title;
                return mock[i];
            }
        }
        return mock;
    }

    function deleteFormById(formId) {
        for (var i in mock) {
            if (mock[i]._id === formId) {
                mock.splice(i,1);
                break;
            }
        }
        return mock;
    }

    function findFormByTitle(formTitle) {
        for (var i in mock) {
            if (mock[i].title === formTitle) {
                return mock[i];
            }
        }
        return null;
    }

    function findAllFormsByUserId(userId) {
        var forms = [];
        for (var i in mock) {
            if (mock[i].userId === userId) {
                forms.push(mock[i]);
            }
        }
        return forms;
    }
}