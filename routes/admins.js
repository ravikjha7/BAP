const express = require("express");
const router = express.Router();

const admins = require('./../controllers/admins');
const auth = require('./../middlewares/auth');

router.route('/users').get(auth.adminAuth, admins.getUsers);
router.route('/scholarships').get(auth.adminAuth, admins.getScholarships);
router.route('/login').post(admins.login);

module.exports = router;