const webhookService = require('../services/webhook.service');

const handleWebhook = async (req, res) => {
    const secretHash = process.env.FLW_SECRET_HASH;
    const signature = req.headers['verif-hash'];
    
    if (!signature || (signature !== secretHash)) {
        // Invalid signature, respond with 401 Unauthorized
        return res.status(401).end();
    }

    const payload = req.body;
    console.log(payload);

    // Respond immediately to Flutterwave to avoid retries
    res.status(200).end();

    // Process the webhook payload
    await webhookService.verifyTransaction(payload);
};

module.exports = {
    handleWebhook,
};
