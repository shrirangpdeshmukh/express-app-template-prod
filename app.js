const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');

const winston = require('./utils/winston-logger');
const errorMethods = require('./utils/error-methods.js');

const route1 = require('./routes/route1-api.js');

const app = express(); //getting express app

//urls can be configured using env variables
const route1Url = process.env.route1Url || '/v1/app/route1';           //http url

//generic middleware for redirection, parsing and request logging

app.use(cors());                                    // solving cors issue using cors middleware
app.use(express.json());                            // parsing json request using middleware 
app.use(morgan('dev',{stream: winston.stream}));    // logging the request

//routes
app.get('/',(req,res)=>{
    res.status(200).send("App is Running \n");                //testing the request at baseURL/
}) 

//health check
app.get('/health',(req,res)=>{
    res.status(200).send("Health Check is Successful.\n");                //testing the request at baseURL/
}) 

app.use(route1Url,route1);         //http route

//invalid endpoint
app.use((req,res,next)=>{
    next(createError(404,"Invalid Endpoint. \n"));
})

//middleware for error methods
app.use(errorMethods.errorLogger);                  //error logger   
app.use(errorMethods.errorHandler);                 //handle error

module.exports = app;