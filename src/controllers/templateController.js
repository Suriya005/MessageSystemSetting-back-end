const mongoose = require('mongoose');
const Template = require('../models/templateModel');
const Type = require('../models/typeModel');

// get all templates
exports.getAllTemplate = async (req, res) => {
    try {
        const templates = await Template.find();
        res.status(200).json({
            message: "success",
            status: 200,
            result: templates
        });
    } catch (err) {
        res.status(500).json({ message: err.message, status: 500, result: [] });
    }
}

// get template by id
exports.getTemplate = async (req, res) => {

    try {
        const template = await Template.findById(req.query.id);
        if (template == null) {
            res.status(404).json({ message: "Wrong data type.", status: 103, result: [] });
        } else {
            res.status(200).json({
                message: "success",
                status: 200,
                result: template
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message, status: 500, result: [] });
    }
}

// create template
exports.createTemplate = async (req, res) => {
    try {
        if (
            req.body.name == null ||
            req.body.name == "" ||
            req.body.desc == null ||
            req.body.desc == "" ||
            req.body.content == null ||
            req.body.content == "" ||
            req.body.messageTypeId == null ||
            req.body.messageTypeId == "" ||
            req.body.status == null ||
            req.body.status == ""
        ) {
            res.status(400).json({ message: "Wrong data type.", status: 103 });
        } else {
            const template = new Template(req.body);
            template._id = new mongoose.Types.ObjectId();
            await template.save();
            res.status(200).json({ message: "success", status: 200 });
        }
    } catch (err) {
        if (err.code == 11000) {
            res.status(400).json({ message: "duplicata data", status: 202 });
        } else {
            res.status(500).json({ message: err.message, status: 500 });
        }
    }
}

// update template
exports.updateTemplate = async (req, res) => {
    try {
        if (
            req.body.name == null ||
            req.body.name == "" ||
            req.body.desc == null ||
            req.body.desc == "" ||
            req.body.content == null ||
            req.body.content == "" ||
            req.body.messageTypeId == null ||
            req.body.messageTypeId == "" ||
            req.body.status == null ||
            req.body.status == ""
        ) {
            res.status(400).json({ message: "Wrong data type.", status: 103 });
        } else {
            const template = await Template.findById(req.query.id);
            if (req.body.name) {
                template.name = req.body.name;
            }
            if (req.body.desc) {
                template.desc = req.body.desc;
            }
            if (req.body.content) {
                template.content = req.body.content;
            }
            if (req.body.messageTypeId) {
                template.messageTypeId = req.body.messageTypeId;
            }
            if (req.body.status) {
                template.status = req.body.status;
            }
            await template.save();
            res.status(200).json({ message: "success", status: 200 });
        }
    } catch (err) {
        res.status(500).json({ message: err.message, status: 500 });
    }
}

// delete template
exports.deleteTemplate = async (req, res) => {
    try {
        const template = await Template.findById(req.query.id);
        if (template == null) {
            res.status(404).json({ message: "Wrong data type.", status: 103 });
        } else {
            await Template.findByIdAndDelete(req.query.id);
            res.status(200).json({ message: "success", status: 200 });
        }
    } catch (err) {
        res.status(500).json({ message: err.message, status: 500 });
    }
}