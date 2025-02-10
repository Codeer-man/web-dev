const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({
        message: "Access Denied: Only admins are allowed",
      });
    }

    next(); // Allow the request to continue if user is an admin
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

module.exports = isAdmin;
