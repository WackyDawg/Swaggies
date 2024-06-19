require("dotenv").config();
require("./config/db").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const userRouter = require('./routes/userRoutes.js'); 
const NotFoundError = require('./utils/errors/notfound.error.js');

const app = express();
app.use(express.json());

// set security HTTP headers
app.use(helmet());

app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

const API_VERSION = process.env.api_v;

app.use(`/api/${API_VERSION}/users`, userRouter); 

app.use((req, res, next) => {
  next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`));
})
// Logic here

module.exports = app;
