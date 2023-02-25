const express = require("express");
const router = express.Router();

const admins = require('./../controllers/admins');
const scholarhips = require('./../controllers/scholarships');
const auth = require('./../middlewares/auth');

router.route('/users').get(auth.adminAuth, admins.getUsers);
router.route('/scholarships').get(auth.adminAuth, scholarhips.getScholarships);
router.route('/login').post(admins.login);

module.exports = router;