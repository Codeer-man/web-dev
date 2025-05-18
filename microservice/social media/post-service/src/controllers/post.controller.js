const Post = require("../models/post");
const logger = require("../utils/logger");
const { publishEvent } = require("../utils/rabbitmq");
const validaeCreatePost = require("../utils/validation");

async function invalidCachePost(req, input) {
  const cacheKey = `posts:${input}`;
  await req.redisClient.del(cacheKey);

  const keys = await req.redisClient.keys("posts:*");
  if (keys.length > 0) {
    await req.redisClient.del(keys);
  }
}

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
      user: req.user,
      content,
      mediaIds: mediaIds || [],
    });
    await newlyCreatedPost.save();
    await invalidCachePost(req, newlyCreatedPost._id.toString());

    await publishEvent("post.created", {
      postId: newlyCreatedPost._id.toString(),
      nuserId: newlyCreatedPost.user.toString(),
      content: newlyCreatedPost.content,
      createAt: newlyCreatedPost.createdAt,
    });

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

    const cacheKey = `posts:${page}:limit:${limit}`;
    const cachedPost = await req.redisClient.get(cacheKey);
    if (cachedPost) {
      return res.status(200).json(JSON.parse(cachedPost));
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

    // Save to Redis (expires in 300s = 5 mins)
    await req.redisClient.setex(cacheKey, 300, JSON.stringify(result));

    return res.status(200).json(result);
  } catch (error) {
    logger.error("Error fetching posts", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching posts",
      error,
    });
  }
};

const getpost = async (req, res) => {
  try {
    const postId = req.params.id;
    const cacheKey = `posts:${postId}`;
    const cacheData = await req.redisClient.get(cacheKey);

    if (cacheData) {
      return res.status(200).json(JSON.parse(cacheData));
    }

    const singlePost = await Post.findById(postId);

    if (!singlePost) {
      throw new Error("Post not found");
    }

    await req.redisClient.setex(cacheKey, 300, JSON.stringify(singlePost));

    res.json(singlePost);
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
    const { userId, postId } = req.params;

    const deletePost = await Post.findOneAndDelete({
      _id: postId,
      user: userId,
    });

    if (!deletePost) {
      throw new Error("Post not found");
    }

    await publishEvent("post.delete", {
      postId: deletePost._id,
      userId: deletePost.user,
      mediaIds: deletePost.mediaIds,
    });

    invalidCachePost(req, userId);

    res.status(200).json({
      success: true,
      message: "Post deleted",
      postId,
    });
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
