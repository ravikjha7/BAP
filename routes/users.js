const express = require("express");
const router = express.Router();

const users = require('./../controllers/users');
const auth = require('./../middlewares/auth');

router.route('/verify/:token').get(users.verifyToken);
router.route('/profile/login').post(users.login);
router.route('/profile/:email').get(users.getProfile);
router.route('/profile').post(users.setProfile).put(auth.auth, users.updateProfile);

module.exports = router;