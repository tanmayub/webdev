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

    function createForm (req, res) {
        var form = req.body;
        var userId = parseInt(req.params.userId);
        form.userId = userId;
        form._id = parseInt(Math.floor(Math.random()*900) + 100);
        formModel.createForm(form);
        res.json(formModel.findAllFormsByUserId(userId));
    }

    function findAllformsForUser(req, res) {
        var userId = parseInt(req.params.userId);
        res.json(formModel.findAllFormsByUserId(userId));
    }

    function findAllForms(req, res) {
        res.json(formModel.findAllForms());
    }

    function findFormById(req, res) {
        var formId = parseInt(req.params.formId);
        res.json(formModel.findFormById(formId));
    }

    function updateFormById(req, res) {
        var formId = parseInt(req.params.formId);
        var form = req.body;
        var newForm = formModel.updateFormById(formId, form);
        res.json(newForm);
    }

    function deleteFormById(req, res) {
        var formId = parseInt(req.params.formId);
        formModel.deleteFormById(formId);
        res.send(200);
    }
}