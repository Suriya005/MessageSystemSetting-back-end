const mongoose = require("mongoose");
const Provider = require("../models/providerModel");
const bcrypt = require("bcrypt");
const db = require("../config/connectDB");





exports.getProviders = async (req, res) => {
  try {
    const providers = await Provider.find();
    const resulte = {
        status : 200,
        message : "success",
        resulte : providers
    }
    res.status(200).json(resulte);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    const resulte = {
        status : 200,
        message : "success",
        resulte : provider
    }
    res.status(200).json(resulte);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProvider = async (req, res) => {
    try {
        const provider = new Provider(req.body);
        // add id
        provider._id = new mongoose.Types.ObjectId();
        // hash password
        const salt = await bcrypt.genSalt(10);
        provider.credential.password = await bcrypt.hash(
            provider.credential.password,
            salt
        );

        await provider.save();
        res.status(200).json({ message : "success", status:200 });
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

exports.updateProvider = async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
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
        res.status(200).json({ message : "success", status:200 });
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteProvider = async (req, res) => {
    try {
        await Provider.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "success", status:200 });
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
