const express = require("express");
const multer = require("multer");
const authenticateRequest = require("../middleware/auth.middleware");
const logger = require("../utils/logger");

const { uploadMedia, getAllMedia } = require("../controllers/media.controller");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single("file");

router.post(
  "/upload",
  authenticateRequest,
  (req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        logger.warn("Error in the multer", err);
        return res.status(400).json({
          message: "Multer error while uploading",
          error: err.message,
          stack: err.stack,
        });
      } else if (err) {
        logger.error("Unknown error occured while uploading:", err);
        return res.status(500).json({
          message: "Unknown error occured while uploading:",
          error: err.message,
          stack: err.stack,
        });
      }
      if (!req.file) {
        return res.status(400).json({
          message: "File not found",
        });
      }
      next();
    });
  },
  uploadMedia
);

router.get("/get", authenticateRequest, getAllMedia);

module.exports = router;
