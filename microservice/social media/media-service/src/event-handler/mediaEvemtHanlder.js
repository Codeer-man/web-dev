const Media = require("../models/media");
const deleteTheImageFromCloudinary = require("../utils/cloudinary");
const logger = require("../utils/logger");

const handleMediaDelete = async (event) => {
  console.log(event);
  const { postId, mediaIds } = event;

  try {
    const deleteMedia = await Media.find({ _id: { $in: mediaIds } });

    for (const media of deleteMedia) {
      await deleteTheImageFromCloudinary(media.publicId);
      await Media.findByIdAndDelete(media._id);
      logger.info("Media deleted");
    }
    logger.info(`Process deletion is completed of media; ${postId}`);
  } catch (error) {
    logger.error("");
  }
};

module.exports = handleMediaDelete;
