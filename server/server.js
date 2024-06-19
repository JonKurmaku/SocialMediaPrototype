const path = require('path');
const express = require('express');

const clientPath = path.join(__dirname,'/../client');
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(clientPath));

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
})