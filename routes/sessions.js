const express = require('express');
const router = express.Router();

const sessions = require('./../controllers/sessions');

router.route('/').post(sessions.createSession);

module.exports = router;