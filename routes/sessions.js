const express = require('express');
const router = express.Router();

const sessions = require('./../controllers/sessions');
const auth = require('./../middlewares/auth');

router.route('/register').post(auth.auth, sessions.registerForSession);
router.route('/:id').get(auth.auth, sessions.getSession);
router.route('/').post(sessions.createSession).get(auth.auth, sessions.getSessions);

module.exports = router;