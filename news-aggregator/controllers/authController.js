const { UserRegService, UserLoginService } = require("../services/authService");

async function register (req, res) {
    try {
        const { message } = await UserRegService(req.body);
        res.status(200).send({
          message
        });
    } catch (error) {
        res.status(400).send({
          message: error.message
        });
    }
};

async function login (req, res) {
    try {
        const { user, message, status, token } = await UserLoginService(req.body);
        if (status === 404 || status === 401) {
            res.status(status).send({
                message
            });
        } else {
            res.status(status).send({
                message,
                user,
                token
            });
        }
    } catch (error) {
        res.status(500).send({
          message: error.message
        });
    }
};

module.exports = {login, register};