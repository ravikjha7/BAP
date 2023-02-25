const express = require("express");
const router = express.Router();

const applyScholarships = require('./../controllers/applyScholarships');
const auth = require('./../middlewares/auth');

router.route('/').post(auth.auth, applyScholarships.applyScholarship);

module.exports = router;