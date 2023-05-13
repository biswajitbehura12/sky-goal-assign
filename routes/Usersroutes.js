const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.js');

const {
    registerUser,
    loginUser,
    getProfile,
    updateUser
} = require('../controllers/usersControls.js')

router.post('/register', registerUser)

router.post('/login', loginUser);

router.get('/profile', auth, getProfile)

router.put('/update', auth, updateUser)

module.exports = router;