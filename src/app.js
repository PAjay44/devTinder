
const express = require('express');

const app = express();

app.use('/test', (req,res) => { // this function handles the request

    res.send('Hello from the server')
})

app.use('/ajay', (req,res) => { // this function handles the request

    res.send('Hello I am ajay')
})

app.listen(3000);// listening the req on port 3000