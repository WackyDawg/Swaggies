const httpStatus = require('http-status');
const verificationService = require('../services/verification.service');

exports.initiateBvnConsent = async (req, res) => {
    try {
        const { bvn } = req.body;
        const user = req.user;

        const consentData = {
            bvn,
            user
        }
        const consentLink = await verificationService.initiateBvnConsent(consentData);

        return res.status(httpStatus.CREATED).send({
            success: true,
            message: "Initialized Bvn verification",
            consentLink,
        });
    } catch (error) {
        console.error("Bvn verification Error >>", error.message);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Failed To Initialize Bvn verification",
            error: error.message,
        });
    }
}