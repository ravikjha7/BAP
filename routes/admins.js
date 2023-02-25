const express = require("express");
const router = express.Router();

const admins = require('./../controllers/admins');

router.route('/users').get(admins.getUsers);

module.exports = router;