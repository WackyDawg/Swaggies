const axios = require('axios');

const BASE_URL = 'http://localhost:3000'; 

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
  } catch (error) {
    if (error.response) {
      console.log('Login Error:', error.response.data);
    } else {
      console.log('Login Error:', error.message);
    }
  }
};

// Run tests
(async () => {
  await testRegister();
  await testLogin();
})();
