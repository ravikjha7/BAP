const express = require("express");
const router = express.Router();

const saves = require('./../controllers/saves');
const auth = require('./../middlewares/auth');

router.route('/scholarship').post(auth.auth, saves.saveScholarship);

module.exports = router;