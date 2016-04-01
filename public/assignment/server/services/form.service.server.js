/**
 * Created by TanmayPC on 3/18/2016.
 */
"use strict"

module.exports = function(app, formModel, uuid) {
    app.post("/api/assignment/user/:userId/form", createForm);
    app.get("/api/assignment/user/:userId/form", findAllformsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.get("/api/assignment/forms", findAllForms);

    function createForm (req, res) {
        var form = req.body;
        var userId = req.params.userId;
        form.userId = userId;
        /*form._id = parseInt(Math.floor(Math.random()*900) + 100);
        formModel.createForm(form);
        res.json(formModel.findAllFormsByUserId(userId));*/
        formModel.createForm(form)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    //req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function findAllformsForUser(req, res) {
        var userId = req.params.userId;
        //res.json(formModel.findAllFormsByUserId(userId));
        formModel.findAllFormsByUserId(userId)
            .then(function(doc) {
                    //console.log(doc);
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function findAllForms(req, res) {
        //res.json(formModel.findAllForms());
        formModel.findAllForms()
            .then(function(doc) {
                    //console.log(doc);
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        //res.json(formModel.findFormById(formId));
        formModel.findFormById(formId)
            .then(function(doc) {
                    //console.log(doc);
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        /*var newForm = formModel.updateFormById(formId, form);
        res.json(newForm);*/
        formModel.updateFormById(formId, form)
            .then(function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        /*formModel.deleteFormById(formId);
        res.send(200);*/
        formModel.deleteFormById(formId)
            .then(function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }
}