const contact = require("../models/contact-models");

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await contact.create(response);
    return res.status(200).json({
      msg: "message sent",
      sucess: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "message not sent",
      sucess: false,
    });
  }
};

module.exports = contactForm;
