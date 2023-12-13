const mongoose = require("mongoose");
const Channel = require("../models/channelModel");
const Provider = require("../models/providerModel");
const Type = require("../models/typeModel");
const loadash = require("lodash");
exports.getAllChannel = async (req, res) => {
  try {
    const channels = await Channel.find();
    const providers = await Provider.find();
    let providerData = [];
    channels.forEach(channel => {
      providerData = [];
      channel.providerId.forEach(id => {
        providers.forEach(provider => {
          if (id == provider._id) {
            providerData.push(provider);
            channel.providerId = providerData;
          }
        });
      });
    });
    res.json({
      message: "success",
      status: 200,
      result: channels
    });
  } catch (error) {
    res.json({
      message: error.message,
      result: [],
      status: 500
    });
  }
};
exports.getChannel = async (req, res) => {
  try {
    if (req.query.id == null || req.query.id == "") {
      res.json({
        message: "Wrong data type.",
        status: 103,
        result: []
      });
    } else {
      const channel = await Channel.findById(req.query.id);
      if (channel == null) {
        res.json({
          message: "id is invalid",
          status: 102,
          result: []
        });
      } else {
        res.json({
          message: "success",
          status: 200,
          result: channel
        });
      }
    }
  } catch (error) {
    res.json({
      message: error.message,
      result: [],
      status: 201
    });
  }
};
exports.createChannel = async (req, res) => {
  try {
    if (req.body.name == null || req.body.name == "" || req.body.providerId == null || req.body.providerId == "" || req.body.status == null || req.body.status == "") {
      res.json({
        message: "Wrong data type.",
        status: 103
      });
    } else {
      const channel = new Channel(req.body);
      channel.providerId = loadash.uniq(channel.providerId);
      channel._id = new mongoose.Types.ObjectId();
      await channel.save();
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
exports.updateChannel = async (req, res) => {
  try {
    if (req.body.name == null || req.body.name == "") {
      res.json({
        message: "Wrong data type.",
        status: 103
      });
    } else if (req.body.providerId == null || req.body.providerId == "") {
      res.json({
        message: "Wrong data type.",
        status: 103
      });
    } else if (req.body.status == null || req.body.status == "") {
      res.json({
        message: "status is null",
        status: 102
      });
    } else if (req.body.providerId.length == 0) {
      res.json({
        message: "Wrong data type.",
        status: 103
      });
    } else {
      const channel = await Channel.findById(req.query.id);
      if (req.body.name) {
        channel.name = req.body.name;
      }
      if (req.body.desc) {
        channel.desc = req.body.desc;
      }
      if (req.body.providerId) {
        channel.providerId = req.body.providerId;
      }
      if (req.body.status) {
        channel.status = req.body.status;
      }
      await channel.save();
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
exports.deleteChannel = async (req, res) => {
  try {
    const PK = await Type.find({
      msgChannelId: req.query.id
    });
    if (PK.length > 0) {
      res.json({
        message: "Wrong data type.",
        status: 103
      });
    } else {
      await Channel.findByIdAndDelete(req.query.id);
      res.json({
        message: "success",
        status: 200
      });
    }
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};