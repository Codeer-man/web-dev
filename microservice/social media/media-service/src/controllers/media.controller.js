const uploadToCloudinary = require("../config/CloudinaryConfig");
const Media = require("../models/media");
const logger = require("../utils/logger");

const uploadMedia = async (req, res) => {
  logger.info("Starting media upload ...");
  try {
    if (!req.file) {
      logger.error("No file found. Please add a file and try again");
      return res.status(400).json({
        success: false,
        message: "No file found. Please add a file and try again",
      });
    }

    const { originalName, mimetype, buffer } = req.file;
    const userId = req.user.userId;
    console.log(userId, "Userid");

    logger.info(`File detail name=${originalName}, type=${mimetype}`);
    logger.infot("Uploading to cloudinary start");

    const cloudinaryUploadResult = await uploadToCloudinary(req.file);
    logger.info(
      `Cloudinary upload success,Public Id = ${cloudinaryUploadResult} and id = ${cloudinaryUploadResult.public_id}`
    );

    const newLyCreatedMedia = new Media({
      publicId: cloudinaryUploadResult.public_id,
      originalName,
      mimetype,
      url: cloudinaryUploadResult.secure_url,
      userId,
    });

    await newLyCreatedMedia.save();

    res.status(201).json({
      success: true,
      mediaId: newLyCreatedMedia._id,
      url: newLyCreatedMedia.url,
      message: "Media upload is success",
    });
  } catch (error) {
    logger.error("Invalid server error"),
      res.status(500).json({
        success: false,
        message: "Invlid server error",
        error: error,
      });
  }
};

module.exports = uploadMedia;
