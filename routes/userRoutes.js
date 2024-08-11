// Import express
const express = require('express');
// Import userController module
const userController = require(`${__dirname}/../controllers/userController`);

const routes = express.Router();

// User Routes
routes.route('/')
.get(userController.getAllUsers)
.post(userController.checkUserAge, userController.checkUserEmail, userController.createUser)

routes.route('/:email')
.get(userController.getUserByEmail)
.patch(userController.checkUserAge, userController.updateUserByEmail)
.delete(userController.deleteUserByEmail)

module.exports = routes;