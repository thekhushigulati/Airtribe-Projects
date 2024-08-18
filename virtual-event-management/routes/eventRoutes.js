const express = require('express');
const eventController = require('./../controllers/eventController');
const { verifyToken } = require('../middlewares/userAuthMdlre');
const { verifyRole } = require('../middlewares/userRoleMdlre');

const router = express.Router();

router
  .route('/')
  .get(verifyToken, verifyRole, eventController.getEvents)
  .post(verifyToken, verifyRole, eventController.createEvent);

router
  .route('/:id')
  .get(verifyToken, eventController.getEvent)
  .put(verifyToken, verifyRole, eventController.updateEvent)
  .delete(verifyToken, verifyRole, eventController.deleteEvent);

module.exports = router;
