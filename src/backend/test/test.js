const axios = require('axios');

const BASE_URL = 'http://localhost:9000';

const registerData = {
  swag_id: '@john_syres',
  first_name: 'John',
  last_name: 'Doe',
  email: 'johndoe@example.com',
  password: 'SecurePassword123',
};

const registerData2 = {
  swag_id: '@jane_syres',
  first_name: 'Jane',
  last_name: 'Doe',
  email: 'janedoe@example.com',
  password: 'SecurePassword123',
};

const loginData = {
  email: 'johndoe@example.com',
  password: 'SecurePassword123',
};

const walletData = {
  walletName: 'Primary wallet'
};

const fundingData = {
  amount: 3000,
}

const bankTransferData = {
  account_bank: '044',
  account_number: '0690000040',
  swag_id: ['@jane_syres'],
  amount: 5000,
  transferType: 'p2p',  // Specify 'p2p' for peer-to-peer transfers or 'bank' for bank transfers 
  narration: '',
  pin: 1111,
};


const bvnData = {
  bvn : ""
}

const pin = 1111;
const confirmPin = 1111;

let token = ''; 
let userId = ''; 
let transactionId = '';

const testRegister = async () => {
  console.log("==> Registering first user")
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
const testRegister2 = async () => {
  console.log("==> Registering second user")
  try {
    const response = await axios.post(`${BASE_URL}/api/1.0/users/register`, registerData2);
    console.log('User 2 Register Response:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('Register Error:', error.response.data);
    } else {
      console.log('Register Error:', error.message);
    }
  }
};

const testLogin = async () => {
  try {
    console.log("==> Login test for first user")
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
    console.log("==> Get first user profile")
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


const testCreateWalletPin = async (userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/1.0/wallet/setpin-wallet`, {
      userId: userId,
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

const testFundWallet = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/1.0/wallet/deposit-wallet`, fundingData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Fund Wallet Response:', response.data);
    transactionId = response.data.transaction_id;
  } catch (error) {
    if (error.response) {
      console.log('Fund Wallet Error:', error.response.data);
    } else {
      console.log('Fund Wallet Error:', error.message);
    }
  }
};

const bankTransfer = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/1.0/wallet/transfer`, bankTransferData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Bank Transfer Response:", response.data)
  } catch (error) {
    if (error.response) {
      console.log('Bank Transfer Error:', error.response.data);
    } else {
      console.log('Bank Transfer Error:', error.message);
    }
  }
}

const getWalletBal = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/1.0/wallet/balance`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Wallet Balance Response:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('Wallet Balance  Error:', error.response.data);
    } else {
      console.log('Wallet Balance  Error:', error.message);
    }
  }
};

const getWalletTransaction = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/1.0/wallet/transactions?limit=10&page=1`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Wallet Transaction Response:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('Wallet Transaction  Error:', error.response.data);
    } else {
      console.log('Wallet Transaction  Error:', error.message);
    }
  }
};

const verifyBvn = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/1.0/kyc/bvn/verification`, bvnData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Verify BVN Response", response.data)
  } catch (error) {
   if (error.response) {
    console.log("Verify BVN Error:", error.response.data)
   } else {
    console.log("Verify BVN Error:", error.message)
   }
}
}

// Run tests
(async () => {
  await testRegister();
  await testRegister2();
  await testLogin();
  await getProfile();
  await testValidateWallet();
  await testCreateWalletPin();
  await testFundWallet();
  await bankTransfer();
  await getWalletBal();
  await getWalletTransaction();
  await verifyBvn();
})();
