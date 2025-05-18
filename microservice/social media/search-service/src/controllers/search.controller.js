const Search = require("../models/search");
const logger = require("../utils/logger");

const searchPost = async (req, res) => {
  logger.info("Search endpoint hit");
  try {
    const { query } = req.query;

    const result = await Search.find(
      {
        $text: { $search: query },
      },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(10);

    res.json(result);
  } catch (error) {
    logger.error("Error while searching data", error);
    res
      .status(404)
      .json({ success: false, message: "Error while searching data" });
  }
};

module.exports = { searchPost };
