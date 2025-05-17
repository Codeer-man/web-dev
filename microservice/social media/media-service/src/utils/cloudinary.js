const cloudinary = require("cloudinary").v2;
const logger = require("./logger");

const deleteTheImageFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info("Image deleted from the cloudinary");
    return result;
  } catch (error) {
    logger.error("Error while deletion from the cloudinary", error);
    throw error;
  }
};

module.exports = deleteTheImageFromCloudinary;
