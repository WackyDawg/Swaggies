const axios = require('axios');

const BASE_URL = 'http://localhost:9000';

const registerData = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'johndoe@example.com',
  password: 'SecurePassword123',
};

const loginData = {
  email: 'johndoe@example.com',
  password: 'SecurePassword123',
};

const walletData = {
  walletName: 'Account1'
};

const fundingData = {
  amount: 3000,
}

const pin = 1111;
const confirmPin = 1111;

let token = ''; 
let userId = ''; 
let transactionId = '';

// Function to test registration
const testRegister = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/1.0/users/register`, registerData);
    console.log('Register Response:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('Register Error:', error.response.data);
    } else {
      console.log('Register Error:', error.message);
    }
  }
};

// Function to test login
const testLogin = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/1.0/users/login`, loginData);
    console.log('Login Response:', response.data);
    token = response.data.results.token; 
    userId = response.data.results._id;
  } catch (error) {
    if (error.response) {
      console.log('Login Error:', error.response.data);
    } else {
      console.log('Login Error:', error.message);
    }
  }
};

const getProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/1.0/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Profile Response:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('Get Profile Error:', error.response.data);
    } else {
      console.log('Get Profile Error:', error.message);
    }
  }
};

// Function to test validating wallet
const testValidateWallet = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/1.0/wallet/validate`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Validate Wallet Response:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('Validate Wallet Error:', error.response.data);
    } else {
      console.log('Validate Wallet Error:', error.message);
    }
  }
};

// Function to test creating a wallet
const testCreateWallet = async (walletData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/1.0/wallet/create-wallet`, walletData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Create Wallet Response:', response.data);
    const walletName = response.data.walletName;
    await testCreateWalletPin(userId, walletName);
  } catch (error) {
    if (error.response) {
      console.log('Create Wallet Error:', error.response.data);
    } else {
      console.log('Create Wallet Error:', error.message);
    }
  }
};

// Function to test wallet pin creation
const testCreateWalletPin = async (userId, walletName) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/1.0/wallet/setpin-wallet`, {
      userId: userId,
      walletName: walletName,
      pin: pin,
      confirm_pin: confirmPin,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Set Wallet Pin Response:', response.data);
  } catch (error) {
    if (error.response) {
      console.log("Set Wallet Pin Error:", error.response.data);
    } else {
      console.log('Set Wallet Pin Error:', error.message);
    }
  }
};

// Function to test wallet funding
const testFundWallet = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/1.0/wallet/deposit-wallet`, fundingData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Fund Wallet Response:', response.data);
    transactionId = response.data.transaction_id; // Capture transaction ID for verification test
  } catch (error) {
    if (error.response) {
      console.log('Fund Wallet Error:', error.response.data);
    } else {
      console.log('Fund Wallet Error:', error.message);
    }
  }
};

// Function to test verifying wallet funding
// const testVerifyWalletFunding = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/1.0/wallet/verify?status=successful&tx_ref=PID-RWBWLFEU4Y&transaction_id=3179773`, {
      
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log('Verify Wallet Funding Response:', response.data);
//   } catch (error) {
//     if (error.response) {
//       console.log('Verify Wallet Funding Error:', error.response.data);
//     } else {
//       console.log('Verify Wallet Funding Error:', error.message);
//     }
//   }
// };

// Run tests
(async () => {
  await testRegister();
  await testLogin();
  await getProfile();
  await testValidateWallet();
  await testCreateWallet(walletData);
  await testFundWallet();
  // await testVerifyWalletFunding(); // Verify wallet funding after funding
})();
