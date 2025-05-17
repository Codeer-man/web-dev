const joi = require("joi");

const validaeCreatePost = (data) => {
  const schema = joi.object({
    content: joi.string().min(3).max(200).required(),
    mediaIds: joi.array(),
  });

  return schema.validate(data);
};

module.exports = validaeCreatePost;
