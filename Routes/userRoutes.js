const express = require('express');
const router = express.Router();
const auth = require('../auth.js');

const userController = require('../Controllers/userController.js')

//[ Routes without Params ]

//this is responsible for the registration of the user 
router.post('/register', userController.userRegistration);

//this route is for the user authentication
router.post('/login', userController.userAuthentication);

//[ Routes with Params ]

//this route is for retrieving user details
router.get('/details/:userId', userController.getProfile);

// Route for setting user as admin
router.put('/update/:userId', auth.verify, userController.updateUser);

module.exports = router;