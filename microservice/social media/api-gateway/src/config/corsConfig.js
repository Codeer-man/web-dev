const cors = require("cors");
const logger = require("../utils/logger");

const ConfigCors = () => {
  return cors({
    origin: (origin, callback) => {
      const whiteListOrigin = ["http://localhost:3000"];
      if (!origin || whiteListOrigin.includes(origin)) {
        callback(null, true);
      } else {
        logger.error("not allowed by cors");
        callback(new Error("not allowed By cors"));
      }
    },
    allowedHeaders: ["Content/type", "Authorization"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  });
};

module.exports = ConfigCors;
