const Search = require("../models/search");
const logger = require("../utils/logger");

async function handlePostCreated(event) {
  try {
    const newSearchPost = new Search({
      postId: event.postId,
      userId: event.userId,
      content: event.content,
      createdAt: event.createdAt,
    });

    await newSearchPost.save();
    logger.info("Search post created", event.postId, event.userId);
    res.json(newSearchPost);
  } catch (error) {
    logger.error("error handling search post creation", error);
  }
}

async function handlePostDelete(event) {
  try {
    await Search.findOneAndDelete({userId:event.userId ,postId:event.postId } )

    logger.info("Post has been deleted")
  } catch (error) {
    logger.error("Error while deleting the search Post",errors)  
    }
}

module.exports = {handlePostCreated ,handlePostDelete}