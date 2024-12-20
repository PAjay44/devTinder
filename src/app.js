
const express = require('express');

const app = express();

app.get('/user', (req,res,next) => {
   
    
    // res.send('response 1')
    next();
},
(req,res,next) => {
   
    // res.send('response 2')
    next();
},

(req,res,next) => {
   
    // res.send('response 3')
    next();
},

(req,res,next) => {
   
    res.send('response 4');
    next();
    
},

);

app.listen(3000);// listening the req on port 3000