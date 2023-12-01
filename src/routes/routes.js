const express = require("express");
const router = express.Router();
const ProviderController = require("../controllers/providerController");
const ChannelController = require("../controllers/channelController");
const TypeController = require("../controllers/typeController");
const TemplateController = require("../controllers/templateController");



// test route
router.get("/", (req, res) => {
  res.json({ msg: "Hello World", status: 200 }), console.log("Hello World");
});


// provider
router.get("/providers", ProviderController.getProviders);
router.get("/provider", ProviderController.getProvider);
router.post("/provider", ProviderController.createProvider);
router.patch("/provider", ProviderController.updateProvider);
router.delete("/provider", ProviderController.deleteProvider);

// channel
router.get("/channels", ChannelController.getAllChannel);
router.get("/channel/:id", ChannelController.getChannel);
router.post("/channel", ChannelController.createChannel);
router.patch("/channel/:id", ChannelController.updateChannel);
router.delete("/channel/:id", ChannelController.deleteChannel);

// type
router.get("/types", TypeController.getAllType);
router.get("/type/:id", TypeController.getType);
router.post("/type", TypeController.createType);
router.patch("/type/:id", TypeController.updateType);
router.delete("/type/:id", TypeController.deleteType);

// template
router.get("/templates", TemplateController.getAllTemplate);
router.get("/template/:id", TemplateController.getTemplate);
router.post("/template", TemplateController.createTemplate);
router.patch("/template/:id", TemplateController.updateTemplate);
router.delete("/template/:id", TemplateController.deleteTemplate);

module.exports = router;
