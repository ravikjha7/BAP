const express = require("express");
const router = express.Router();

const users = require('./../controllers/users');

router.route('/profile/:email').get(users.getProfile)
router.route('/profile').post(users.setProfile).put(users.updateProfile);

module.exports = router;