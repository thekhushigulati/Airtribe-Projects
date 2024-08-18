const { UserRegService, UserLoginService } = require('../services/authService');

async function createUser(req, res) {
  try {
    const { message } = await UserRegService(req.body);
    return res.status(200).send({
      message
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
}

async function loginUser(req, res) {
  try {
    const { user, message, status, token } = await UserLoginService(req.body);
    if (status === 404 || status === 401 || status === 400) {
      return res.status(status).send({
        message
      });
    }
    return res.status(status).send({
      message,
      user,
      token
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
}

module.exports = { loginUser, createUser };
