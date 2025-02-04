const express = require("express");
const contactForm = require("../controllers/contact-controller");
const contactValidation = require("../validation/contact-validation");
const contactmiddleware = require("../middleware/validate-middleware");

const router = express.Router();

router.post("/contact", contactmiddleware(contactValidation), contactForm);

module.exports = router;
