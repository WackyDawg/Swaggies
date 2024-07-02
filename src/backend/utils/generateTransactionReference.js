const randomstring = require("randomstring");

const generateTransactionReference = () => {
  return randomstring.generate({
    length: 16, 
    charset: "numeric",
  });
};

module.exports = generateTransactionReference;
