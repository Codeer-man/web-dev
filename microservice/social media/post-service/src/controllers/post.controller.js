const Post = require("../models/post");
const logger = require("../utils/logger");
const validaeCreatePost = require("../utils/validation");

const createPost = async (req, res) => {
  logger.info("Create post endpoiint hit ...");
  try {
    const { error } = validaeCreatePost(req.body);
    if (error) {
      logger.warn("validation error", error.details[0].message);
      throw new Error(error.details[0].message, 400, false);
    }

    const { content, mediaIds } = req.body;

    const newlyCreatedPost = new Post({
      user: req.user.userId,
      content,
      mediaIds: mediaIds || [],
    });
    await newlyCreatedPost.save();
    logger.info("Post created successfully", { post: newlyCreatedPost });
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newlyCreatedPost,
    });
  } catch (error) {
    logger.error("Error creating post", error);
    res.status(500).json({
      success: false,
      message: "Error creating post",
      error,
    });
  }
};

const getAllpost = async (req, res) => {
  try {
  } catch (error) {
    logger.error("Error fetching post", error);
    res.status(500).json({
      success: false,
      message: "Error fetching post",
      error,
    });
  }
};

const getpost = async (req, res) => {
  try {
  } catch (error) {
    logger.error("Error creating post", error);
    res.status(500).json({
      success: false,
      message: "Error creating post",
      error,
    });
  }
};

const deletepost = async (req, res) => {
  try {
  } catch (error) {
    logger.error("Error deleting post", error);
    res.status(500).json({
      success: false,
      message: "Error deleting post",
      error,
    });
  }
};

module.exports = { deletepost, getpost, getAllpost, createPost };
