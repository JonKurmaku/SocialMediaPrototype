const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data.js");

var app = express();
dotenv.config();

var port = process.env.PORT || 3000;
console.log(process.env.PORT);
console.log(port);

app.get('/',(req,res)=>{
    res.send("HELLO XHAXHI");
})

app.get('/api/chat',(req,res)=>{
    res.send(chats);
})

app.get('/api/chat/:id',(req,res)=>{
    console.log(req.params.id)
    res.send(chats.find(o=>(o._id===req.params.id)))
})

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
})