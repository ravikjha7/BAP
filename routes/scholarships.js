const express = require("express");
const router = express.Router();

const scholarhips = require('./../controllers/scholarships');
const auth = require('./../middlewares/auth');

router.route('/:id').get(auth.auth, scholarhips.getScholarship);
router.route('/').get(auth.auth, scholarhips.getScholarships).post(scholarhips.addScholarships);

module.exports = router;