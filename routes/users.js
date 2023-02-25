const express = require("express");
const router = express.Router();

const users = require('./../controllers/users');
const auth = require('./../middlewares/auth');
const userscholarships = require('./../controllers/userScholarships');

router.route('/verify/:token').get(users.verifyToken);
router.route('/profile/login').post(users.login);
router.route('/profile').post(users.setProfile).put(auth.auth, users.updateProfile).get(auth.auth, users.getProfile);
router.route('/scholarship').get(auth.auth, userscholarships.getMyScholarships);

module.exports = router;