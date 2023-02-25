const express = require("express");
const router = express.Router();

const scholarhips = require('./../controllers/scholarships');
const auth = require('./../middlewares/auth');

router.route('/').get(auth.auth, scholarhips.getScholarships);

module.exports = router;