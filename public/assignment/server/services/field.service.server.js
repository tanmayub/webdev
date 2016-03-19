/**
 * Created by TanmayPC on 3/18/2016.
 */
"use strict"

module.exports = function (app, formModel, uuid) {
    app.post("/api/assignment/form/:formId/field", createFormField);
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldIdAndFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdAndFormId);

    function createFormField (req, res) {
        var field = req.body;
        var formId = parseInt(req.params.formId);
        field._id = parseInt(uuid.v4(), 16);
        formModel.createFieldForForm(formId, field);
        res.json(formModel.findAllFieldsForForm(formId));
    }

    function findAllFieldsForForm(req, res) {
        var formId = parseInt(req.params.formId );
        res.json(formModel.findAllFieldsForForm(formId));
    }

    function findFieldByFieldIdAndFormId(req, res) {
        var formId = parseInt(req.params.formId);
        var fieldId = parseInt(req.params.fieldId);
        res.json(formModel.findFieldByFieldIdAndFormId(formId, fieldId));
    }

    function updateFieldByFieldIdAndFormId (req, res) {
        var formId = parseInt(req.params.formId);
        var fieldId = parseInt(req.params.fieldId);
        var field = req.body;
        formModel.updateFieldByFieldIdAndFormId(formId, fieldId, field);
        res.send(200);
    }

    function deleteFieldByFieldIdAndFormId (req, res) {
        var formId = parseInt(req.params.formId);
        var fieldId = parseInt(req.params.fieldId);
        formModel.deleteFieldByFieldIdAndFormId(formId, fieldId);
        res.send(200);
    }

}