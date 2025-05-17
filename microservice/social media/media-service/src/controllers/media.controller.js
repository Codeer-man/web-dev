const { Model } = require("mongoose");
const uploadToCloudinary = require("../config/CloudinaryConfig");
const Media = require("../models/media");
const logger = require("../utils/logger");

const invalidCachePost = async (req, input) => {
  const cacheKey = `media:${input}`;
  await req.redisClient.del(cacheKey);

  const key = await req.redisClient.get("media:");
  if (key.length > 0) {
    return await req.redisClient.del(key);
  }
};

const uploadMedia = async (req, res) => {
  logger.info("Starting media upload ...");
  try {
    console.log(req.file, "reqfile");

    if (!req.file) {
      logger.error("No file found. Please add a file and try again");
      return res.status(400).json({
        success: false,
        message: "No file found. Please add a file and try again",
      });
    }

    const { originalname, mimetype, buffer } = req.file;
    const userId = req.user;

    logger.info(`File detail name=${originalname}, type=${mimetype}`);
    logger.info("Uploading to cloudinary start");

    const cloudinaryUploadResult = await uploadToCloudinary(req.file);
    logger.info(
      `Cloudinary upload success,Public Id = ${cloudinaryUploadResult} and id = ${cloudinaryUploadResult.public_id}`
    );

    const newLyCreatedMedia = new Media({
      publicId: cloudinaryUploadResult.public_id,
      originalname,
      mimetype,
      url: cloudinaryUploadResult.secure_url,
      userId,
    });

    await newLyCreatedMedia.save();
    await invalidCachePost(req, newLyCreatedMedia._id);
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

const getAllMedia = async (req, res) => {
  try {
    const cacheKey = `Media:all`;
    const cacheData = await req.redisClient.get(cacheKey);
    if (cacheData) {
      return res.status(200).json(JSON.parse(cacheData));
    }

    const media = await Media.find({});
    await req.redisClient.setex(cacheKey, 300, JSON.stringify(media));

    if (media.length < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid sercer error",
      });
    }

    res.status(201).json({
      success: false,
      message: "Product data",
      data: media,
    });
  } catch (error) {
    logger.error("Invalid server error", error),
      res.status(500).json({
        success: false,
        message: "Invalid sercer error",
        error,
      });
  }
};

module.exports = { uploadMedia, getAllMedia };
