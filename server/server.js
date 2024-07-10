const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data.js");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");

var app = express();
dotenv.config();
connectDB()


var port = process.env.PORT || 3000;
console.log(process.env.PORT);
console.log(port);

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("HELLO XHAXHI");
})

app.use('/api/user',userRoutes)

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
})