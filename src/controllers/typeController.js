const mongoose = require('mongoose');
const Type = require('../models/typeModel');

exports.getAllType = (req, res, next) => {
    Type.find()
        .exec()
        .then(types => {
            res.status(200).json(types);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

exports.getType = (req, res, next) => {
    Type.findById(req.params.id)
        .exec()
        .then(type => {
            res.status(200).json(type);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

exports.createType = (req, res, next) => {
    const type = new Type(req.body);
    // add id
    type._id = new mongoose.Types.ObjectId();
    type.save()
        .then(result => {
            res.status(201).json(type);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

exports.updateType = (req, res, next) => {
    Type.findById(req.params.id)
        .exec()
        .then(type => {
            if (req.body.name) {
                type.name = req.body.name;
            }
            if (req.body.desc) {
                type.desc = req.body.desc;
            }
            if (req.body.msgChannelId) {
                type.msgChannelId = req.body.msgChannelId;
            }
            if (req.body.status) {
                type.status = req.body.status;
            }
            type.save()
                .then(result => {
                    res.status(201).json(type);
                })
                .catch(err => {
                    res.status(500).json({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

exports.deleteType = (req, res, next) => {
    Type.findByIdAndDelete(req.params.id)
        .exec()
        .then(type => {
            res.status(200).json(type);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}