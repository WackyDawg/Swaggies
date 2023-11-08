import express from 'express'; 
import dotenv from 'dotenv';
import xss from 'xss-clean';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import routes from './api/routes/index.js';
import errorHandler from './api/middlewares/error-handler.js';
//import NotFoundError from './api/utils/errors/notfound.error.js';

dotenv.config(); 

const app = express();


import "dotenv/config";

// set security HTTP headers
app.use(helmet());

// parse json request body
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

//app.use(routes);

app.use((req, res, next) => {
  next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`));
})

//app.use(errorHandler);

export { app };