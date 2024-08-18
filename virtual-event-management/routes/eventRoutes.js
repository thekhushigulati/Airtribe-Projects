const express = require('express');
const eventController = require('./../controllers/eventController');
const { verifyToken } = require('../middlewares/userAuthMdlre');
const { verifyRole } = require('../middlewares/userRoleMdlre');

const router = express.Router();

//Event Routes
router
  .route('/')
  .get(verifyToken, verifyRole, eventController.getEvents)
  .post(verifyToken, verifyRole, eventController.createEvent);

router
  .route('/:id')
  .get(verifyToken, verifyRole, eventController.getEvent)
  .put(verifyToken, verifyRole, eventController.updateEvent)
  .delete(verifyToken, verifyRole, eventController.deleteEvent);

//Participant routes
router.post('/:id/register', verifyToken, eventController.registerForEvent);
router.get(
  '/:id/participants',
  verifyToken,
  verifyRole,
  eventController.getEventParticipants
);
router.delete(
  '/:id/participants/:userId',
  verifyToken,
  verifyRole,
  eventController.deleteParticipant
);

module.exports = router;
