const axios = require('axios');

const initiateBvnVerification = async (bvn, user) => {
    try {
        console.log("User Data",user)
        const response = await axios.post("https://api.flutterwave.com/v3/bvn/verifications", {
            bvn: bvn,
            firstname: user.firstname,
            lastname: user.lastname,
            redirect_url: "https://example-url.company.com"
        }, {
            headers: {
                Authorization: `Bearer ${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.data.url;
    } catch (error) {
        console.error("Error initiating verification:", error.message);
        throw new Error(error.message);
    }
}

const verifyBvnConsent = async (reference) => {
    try {
        const response = await axios.get(`https://api.flutterwave.com/v3/bvn/verifications/${reference}`,  {
            headers: {
                Authorization: `Bearer ${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        
    }
}

module.exports = { initiateBvnVerification };
