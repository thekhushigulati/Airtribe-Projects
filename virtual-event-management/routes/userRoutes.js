const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/register').post(userController.createUser);

router.route('/login').post(userController.loginUser);

// router.route('/:id')
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
