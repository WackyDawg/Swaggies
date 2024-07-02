const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

router.post('/flw-webhook', webhookController.handleWebhook);

module.exports = router;
