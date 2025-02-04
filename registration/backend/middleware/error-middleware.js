const errormiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "backend error";
  const sucess = err.sucess || "";

  return res.status(status).json({ message, sucess });
};

module.exports = errormiddleware;
