const flw = require('flutterwave-node-v3');

const verifyTransaction = async (payload) => {
    try {
        const secretHash = process.env.FLW_SECRET_HASH;
        const signature = req.headers["verif-hash"];
        if (!signature || (signature !== secretHash)) {
            // This request isn't from Flutterwave; discard
            res.status(401).end();
        }
        const payload = req.body;
        // It's a good idea to log all received events.
        log(payload);
        // Do something (that doesn't take too long) with the payload
        res.status(200).end()
    } catch (error) {

    }
};

module.exports = {
    verifyTransaction,
};
