import mongoose from 'mongoose';  // Correct import syntax
import bcrypt from 'bcryptjs';  // Correct import syntax
import jwt from 'jsonwebtoken';  // Correct import syntax
import dotenv from 'dotenv';
dotenv.config();

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Optional, but a good practice to make the email unique
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Password Hashing: The pre middleware is defined within the userSchema before creating the User model.
userSchema.pre('save', async function (next) {
  const user = this;
  console.log('actual data ', this);

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashedPassword;
    next();  // Proceed with saving the user document
  } catch (error) {
    return next(error);
  }
});

// Compare the provided password with the hashed password stored in the database
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password); // Compare the plain password with the hashed password
  } catch (error) {
    throw new Error('Error comparing password');
  }
};

// Generate JSON Web Token
userSchema.methods.generateToken = async function () {
  console.log('Token Generated');
  console.log('JWT Secret Key:', process.env.JWT_SECRET_KEY); // Check if secret is loaded
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY, // Ensure the secret key is available
      { expiresIn: '30d' }
    );
  } catch (error) {
    console.error('Token Error: ', error);
  }
};

// Define the model or the collection name
const User = mongoose.model('USER', userSchema);

export default User;  // Correct export syntax