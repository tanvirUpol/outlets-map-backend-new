const express = require('express');
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

// constroller functions
const { signupUser, loginUser, stayAlive, getUser, changePassword, verifyUser } = require('../controllers/userController')

// profile route
router.get('/profile', requireAuth, getUser)

// login route
router.post('/login', loginUser)


// pass change
router.post('/changep/:id',requireAuth, changePassword)


// verify pass
router.post('/verify', verifyUser)


// pass change
// router.post('/changepass', changePassword)

// sign up route
router.post('/signup', signupUser)

// stay alive route
router.get('/alive', stayAlive)



module.exports = router