const mongoose = require("mongoose");
const Provider = require("../models/providerModel");
const Channel = require("../models/channelModel");
const bcrypt = require("bcrypt");
const db = require("../config/connectDB");
exports.getProviders = async (req, res) => {
  try {
    const providers = await Provider.find();
    const result = {
      status: 200,
      message: "success",
      result: providers
    };
    res.json(result);
  } catch (error) {
    res.json({
      message: error.message,
      result: [],
      status: 500
    });
  }
};
exports.getProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.query.id);
    const result = {
      status: 200,
      message: "success",
      result: provider
    };
    res.json(result);
  } catch (error) {
    res.json({
      message: error.message,
      result: [],
      status: 201
    });
  }
};
exports.createProvider = async (req, res) => {
  try {
    if (req.body.name == null || req.body.name == "") {
      res.json({
        message: "Wrong data type.",
        status: 103
      });
    } else if (req.body.credential.username == null || req.body.credential.username == "") {
      res.json({
        message: "Wrong data type.",
        status: 103
      });
    } else if (req.body.credential.password == null || req.body.credential.password == "") {
      res.json({
        message: "Wrong data type.",
        status: 103
      });
    } else if (req.body.status == null || req.body.status == "") {
      res.json({
        message: "Wrong data type.",
        status: 103
      });
    } else {
      const provider = new Provider(req.body);
      provider._id = new mongoose.Types.ObjectId();
      const salt = await bcrypt.genSalt(10);
      provider.credential.password = await bcrypt.hash(provider.credential.password, salt);
      await provider.save();
      res.json({
        message: "success",
        status: 200
      });
    }
  } catch (error) {
    if (error.code == 11000) {
      res.json({
        message: "duplicata data",
        status: 202
      });
    } else {
      res.json({
        message: error.message,
        status: 500
      });
    }
  }
};
exports.updateProvider = async (req, res) => {
  try {
    if (req.body.name == null || req.body.name == "") {
      res.json({
        message: "Wrong data type.",
        status: 103
      });
    } else if (req.body.credential.username == null || req.body.credential.username == "") {
      res.json({
        message: "Wrong data type.",
        status: 103
      });
    } else if (req.body.credential.password == null || req.body.credential.password == "") {
      res.json({
        message: "Wrong data type.",
        status: 103
      });
    } else if (req.body.status == null || req.body.status == "") {
      res.json({
        message: "Wrong data type.",
        status: 103
      });
    } else {
      const provider = await Provider.findById(req.query.id);
      if (req.body.name) {
        provider.name = req.body.name;
      }
      if (req.body.desc) {
        provider.desc = req.body.desc;
      }
      if (req.body.credential) {
        provider.credential = req.body.credential;
      }
      if (req.body.status) {
        provider.status = req.body.status;
      }
      await provider.save();
      res.json({
        message: "success",
        status: 200
      });
    }
  } catch (error) {
    if (error.code == 11000) {
      res.json({
        message: "duplicata data",
        status: 202
      });
    } else {
      res.json({
        message: error.message,
        status: 500
      });
    }
  }
};
exports.deleteProvider = async (req, res) => {
  try {
    if (req.query.id == null || req.query.id == "") {
      res.json({
        message: "Wrong data type.",
        status: 103
      });
    } else {
      const provider = await Provider.findById(req.query.id);
      if (provider == null) {
        res.json({
          message: "Wrong data type.",
          status: 103
        });
      } else {
        const channel = await Channel.find({
          providerId: {
            $in: [req.query.id]
          }
        });
        if (channel.length > 0) {
          res.json({
            message: "Wrong data type.",
            status: 103
          });
        } else {
          await Provider.findByIdAndDelete(req.query.id);
          res.json({
            message: "success",
            status: 200
          });
        }
      }
    }
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};