const express = require('express');
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

// constroller functions
const { signupUser, loginUser, stayAlive, getUser, changePassword } = require('../controllers/userController')

// login route
router.get('/profile', requireAuth, getUser)

// login route
router.post('/login', loginUser)


// login route
router.post('/changep/:id',requireAuth, changePassword)

// sign up route
router.post('/signup', signupUser)

// stay alive route
router.get('/alive', stayAlive)



module.exports = router