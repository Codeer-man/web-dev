import express from "express";
const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).send("welcome to home page mernstack development");
});

router.route("/register").get((req, res) => {
  try {
    res.status(200).json({ msg: "register page" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error.message);
  }
});

router.route("/register").post((req, res) => {
  try {
    const data = req.body;
    console.log(req.body);
    res.status(200).json({ msg: "data fully submitted", data });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error.message);
  }
});

router.route("/login").get((req, res) => {
  res.status(200).send("welcome to Login page");
});

export default router;
