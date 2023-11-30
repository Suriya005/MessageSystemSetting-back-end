const mongoose = require('mongoose');
const Template = require('../models/templateModel');

// get all templates
exports.getAllTemplate = (req, res) => {
  Template.find().exec().then(templates => {
    res.status(200).json(templates);
  }).catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
};

// get template by id
exports.getTemplate = (req, res) => {
  Template.findById(req.params.id).exec().then(template => {
    res.status(200).json(template);
  }).catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
};

// create template
exports.createTemplate = (req, res) => {
  const template = new Template(req.body);
  // add id
  template._id = new mongoose.Types.ObjectId();
  template.save().then(result => {
    res.status(201).json(template);
  }).catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
};

// update template
exports.updateTemplate = (req, res) => {
  Template.findById(req.params.id).exec().then(template => {
    if (req.body.name) {
      template.name = req.body.name;
    }
    if (req.body.desc) {
      template.desc = req.body.desc;
    }
    if (req.body.content) {
      template.content = req.body.content;
    }
    if (req.body.msgChannelId) {
      template.msgChannelId = req.body.msgChannelId;
    }
    if (req.body.status) {
      template.status = req.body.status;
    }
    template.save().then(result => {
      res.status(201).json(template);
    }).catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
  }).catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
};

// delete template
exports.deleteTemplate = (req, res) => {
  console.log(req.params.id);
  Template.findByIdAndDelete(req.params.id).exec().then(template => {
    res.status(200).json(template);
  }).catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
};