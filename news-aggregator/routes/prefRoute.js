const express = require('express');
const routes = express.Router();

const { getPreferences, updatePreferences } = require("../controllers/userPrefController");
const { verifyToken } = require("../middlewares/authJWT");

routes.get('/', verifyToken, getPreferences);

routes.put('/', verifyToken, updatePreferences);

module.exports = routes;