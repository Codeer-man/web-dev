const { z } = require("zod");

const env = z
  .object({
    MONGODB_URL: z.string(),
    MONGODB_DATABASE_NAME: z.string(),
  })
  .parse(process.env);

module.exports = env;
