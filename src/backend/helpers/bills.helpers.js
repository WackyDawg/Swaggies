const { default: axios } = require("axios");

const getBillCategories = async () => {
  try {
    const response = await axios.get(
      "https://api.flutterwave.com/v3/top-bill-categories",
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("getBillCategories >>", error.message);
    throw new Error(error.message);
  }
};

/**
 * Helper function to fetch billers by category and country
 *
 * @param {string} categoryId - The code of the biller (e.g., electricity, water, etc.)
 * @param {string} countryCode - The country code for the biller Expected values include: NG, GH, KE and ZM
 * @returns {Promise<Object>} - Returns the biller info response
 */
const getBillersByCategory = async (categoryId, countryCode) => {
  try {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/bills/${categoryId}/billers?country=${countryCode}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("getBillerInf Error >>", error.message);
    throw new Error(error.message);
  }
};

/**
 * Helper function to retrieve bill details provided by billers.
 *
 * @param {string} billerCode - The code of the biller (e.g., BIL119(DSTV Payment) etc.)
 * @returns {Promise<Object>} - Returns the bill details provided by billers
 */
const getBillInformation = async (billerCode) => {
  try {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/billers/${billerCode}/items`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("getBillInformation Error >>", error.message);
    throw new Error(error.message);
  }
};

/**
 * Helper function to validate customer's information. Supported input include: meter number, smartcard number, internet account number, etc.
 *
 * @param {string} itemCode - The code of the item to be purchased (e.g., CB141(DSTV Payment) etc.)
 * @param {string} billerCode - The code of the biller (e.g., BIL119(DSTV Payment) etc.)
 * @param {string} customerId - The customer identifier for the bill payment. (e.g. meter number, smartcard number, internet account number, etc.)
 * @returns {Promise<Object>} - Returns the validated customer details
 */
const validateCustomerDetails = async (itemCode, billerCode, customerId) => {
  try {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/bill-items/${itemCode}/validate?code=${billerCode}&customer=${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
        },
      }
    );
    return response;
  } catch (error) {
    // console.error("validateCustomerDetails Error >>", error.message);
    throw new Error(`Error validating customer input: ${error.message}`);
  }
};

/**
 * Helper function to Initiate customers bill payments.
 *
 * @param {string} country - The code of the item to be purchased (e.g., CB141(DSTV Payment) etc.)
 * @param {string} amount - The bill amount.
 * @param {string} reference - The merchant's unique identifier for the payment.
 * @param {string} callbackUrl - Merchant-specific URL for bill payment callbacks
 * @param {string} billerCode - The biller code returned in the get biller response (e.g., BIL119(DSTV Payment) etc.)
 * @param {string} customerId - The customer identifier for the bill payment. (e.g. meter number, smartcard number, internet account number, etc.)
 * @returns {Promise<Object>} - Returns the validated customer details
 */
const payBill = async (country, customerId, amount, reference, callbackUrl, billerCode, itemCode) => {
  try {
    const payload = {
      country: country,
      customer_id: customerId,
      amount: amount,
      reference: reference,
      callback_url: callbackUrl,
    };
    const response = await axios.post(
      `https://api.flutterwave.com/v3/billers/${billerCode}/items/${itemCode}/payment`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error paying bill: ${error.message}`);
  }
};

/**
 * Helper function to get the status of a bill purchase
 *
 * @param {string} reference - The merchant's unique identifier for the payment.
 * @returns {Promise<Object>} - Returns the payment status of a bill purchase
 */
const getpaymentStatus = async (reference) => {
  try {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/bills/${reference}?verbose=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(`Error getting payment status: ${error.message}`);
  }
};

module.exports = { getBillCategories, getBillersByCategory, getBillInformation, validateCustomerDetails, payBill, getpaymentStatus };
