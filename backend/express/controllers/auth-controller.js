import User from "../models/user-model.js"; // Correct import statement

// Creating home controller
const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
};

// Creating register controller
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    const token = await userCreated.generateToken();
    console.log("Generated Token: ", token); // Log the token to the console

    res.status(201).json({
      msg: "Registration success full",
      token: token,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//creating login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare password using the comparePassword method
    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {
      // Generate a token if the password is valid
      const token = await userExist.generateToken();
      res.status(200).json({
        message: 'Login successful',
        token: token,
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default { home, register, login };
