const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "invalie server error" });
  }
};

// creataing register
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "all fiels are required" });
    } else if (!email.includes("@") && !email.endWith(".com")) {
      return res.status(400).json({ msg: "add @ and .com in it" });
    } else if (password.length > 8) {
      return res
        .status(400)
        .json({ msg: "password must be at least 8 characters" });
    }

    console.log("rgister sucessful \n Email:", email);
    console.log("Password:", password);

    return res
      .status(200)
      .json({ msg: "register sucessful", user: { email, password } });
  } catch (error) {
    console.error("error during registration", error.message);
    res.status(500).json({ msg: "invalie server error" });
  }
};
export default { home, register };
// module.exports = { home, register };
