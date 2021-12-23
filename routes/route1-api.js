const router1 = require('express').Router();
const logger = require('../utils/winston-logger');
const createError = require('http-errors');

//testing basic http API
router1.get('/',(req,res,next)=>{
    res.status(200).send("Route1 GET request \n");
})

// handle incoming http request
router1.post('/',(req,res,next)=>{
    try{
        let requestData = req.body;                             //extract http request body
        logger.log('info','raw message %o',requestData);        
        
        res.status(200).send("Route1 POST Request \n");     //send response
        
    }catch(e){
        logger.error(e);
        next(createError(400,"Bad Request"));                       //throw bad request error
    }
})
module.exports = router1; 