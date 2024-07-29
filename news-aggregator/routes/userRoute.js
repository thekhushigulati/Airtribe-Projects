const express = require('express');
const routes = express.Router();

const { register, login } = require("../controllers/authController");
const preferences = require('./prefRoute');

routes.post('/signup', register);

routes.post('/login', login);

routes.use("/preferences", preferences);

module.exports = routes;