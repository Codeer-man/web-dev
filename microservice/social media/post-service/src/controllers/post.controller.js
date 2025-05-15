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
    console.log(req.user);

    const newlyCreatedPost = new Post({
      user: req.user,
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const totalPost = await Post.countDocuments();
    const startIndex = (page - 1) * limit;

    const cachekey = `posts:${page}:limit:${limit}`;
    const cachedPost = await req.redisClient.get(cachekey);
    if (cachedPost) {
      res.status(200).json(JSON.parse(cachedPost));
    }

    const post = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const result = {
      currentPage: page,
      totalPost,
      totalPage: Math.ceil(totalPost / limit),
      post,
    };

    // save to redis or cache
    await req.redisClient.setex(cachekey, 300, JSON.stringify(result));

    res.json(result);
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
