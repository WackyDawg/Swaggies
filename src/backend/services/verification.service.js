const User = require("../models/user");
const { initiateBvnVerification } = require("../helpers/verification.helpers");

const initiateBvnConsent = async (consentData) => {
    const bvn  = consentData.bvn;
    const user = consentData.user;
    return initiateBvnVerification(bvn, user);
}
 
module.exports = {
    initiateBvnConsent
}