const express = require('express');
const ensureAuthenticated = require('../middleware/auth');
const { handleSubscription } = require('../controllers/subscribe_f');
const router = express.Router();

router.post('/subscribe', ensureAuthenticated, handleSubscription);

module.exports = router;
