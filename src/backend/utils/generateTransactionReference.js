const randomstring = require("randomstring");

const generateTransactionReference = () => {
  return randomstring.generate({
    length: 10,
    charset: "alphanumeric",
    capitalization: "uppercase",
  });
};

module.exports = generateTransactionReference;