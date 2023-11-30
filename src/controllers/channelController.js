const mongoose = require("mongoose");
const Channel = require("../models/channelModel");
const Provider = require("../models/providerModel");

exports.getAllChannel = async (req, res) => {
  try {
    const channels = await Channel.find();
    const providers = await Provider.find();
    let providerData = [];
    channels.forEach((channel) => {
      providerData = [];
      channel.providerId.forEach((id) => {
        providers.forEach((provider) => {
          if (id == provider._id) {
            providerData.push(provider);
            channel.providerId = providerData;
          }
        });
      });
    });
    console.log(channels);
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createChannel = async (req, res) => {
  try {
    const channel = new Channel(req.body);
    // add id
    channel._id = new mongoose.Types.ObjectId();
    await channel.save();
    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
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
    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findByIdAndDelete(req.params.id);
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
