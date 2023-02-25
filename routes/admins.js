const express = require("express");
const router = express.Router();

const admins = require('./../controllers/admins');
const scholarhips = require('./../controllers/scholarships');

router.route('/users').get(admins.getUsers);
router.route('/scholarships').get(scholarhips.getScholarships);

module.exports = router;