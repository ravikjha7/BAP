const express = require("express");
const router = express.Router();

const removes = require('./../controllers/removes');
const auth = require('./../middlewares/auth');

router.route('/scholarship').post(auth.auth, removes.removeScholarship);

module.exports = router;