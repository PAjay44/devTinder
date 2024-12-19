
const express = require('express');

const app = express();

// app.use('/ajay', (req,res) => { // this function handles the request

//     res.send('Hello I am ajay')
// })

app.get('/user', (req,res) => {

    res.send({'firstname':'ajay'})
});

app.post('/user', (req,res) => {

    res.send('successfully saved into database')
});

app.delete('/user', (req,res) => {

    res.send('data successfully deleted in database')
});




app.use('/test', (req,res) => { // this function handles the request

    res.send('Hello from the server')
})





app.listen(3000);// listening the req on port 3000