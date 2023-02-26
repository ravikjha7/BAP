const express = require('express');
const router = express.Router();

const mentors = require('./../controllers/mentors');

router.route('/add').post(mentors.addMentor);

module.exports = router;