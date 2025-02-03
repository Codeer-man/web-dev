const isAdmin = (req, res, next) => {
  if (req.userInfos.role === "user") {
    return res.status(403).json({
      sucess: false,
      msg: "Only admin are allowed in the page",
    });
  }
  next();
};
module.exports = isAdmin;
