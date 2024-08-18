const { UserRegService, UserLoginService } = require('../services/authService');

async function createUser(req, res) {
  try {
    const { message } = await UserRegService(req.body);
    return res.status(200).json({
      message
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

async function loginUser(req, res) {
  try {
    const { user, message, status, token } = await UserLoginService(req.body);
    if (status === 404 || status === 401 || status === 400) {
      return res.status(status).json({
        message
      });
    }
    return res.status(status).json({
      message,
      user,
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = { loginUser, createUser };
