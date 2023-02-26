const express = require('express');
const router = express.Router();

const mentors = require('./../controllers/mentors');

router.route('/add').post(mentors.addMentor);
router.route('/').get(mentors.getMentors);

module.exports = router;