const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function UserRegService(body) {
  try {
    const { name, password, email, role } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      password: hashedPassword,
      email,
      role
    });

    await user.save();
    return {
      message: 'User Registered successfully!'
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function UserLoginService(body) {
  try {
    const { email, password } = body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return {
        status: 404,
        message: 'User not found!'
      };
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return {
        status: 401,
        message: 'Invalid Password!'
      };
    }
    const token = jwt.sign(
      {
        id: user.id
      },
      process.env.API_SECRET,
      {
        expiresIn: 86400
      }
    );
    return {
      status: 200,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        preferences: user.preferences
      },
      message: 'Login successful!',
      token: token
    };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { UserRegService, UserLoginService };
