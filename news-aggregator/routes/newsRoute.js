const express = require('express');
const routes = express.Router();

const { verifyToken } = require("../middlewares/authJWT");
const { getNews/*, getNewsById, updateNews, deleteNews*/ } = require("../controllers/newsController");

routes.get('/', verifyToken, getNews);

module.exports = routes;