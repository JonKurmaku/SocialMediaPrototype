const express = require("express")
const cors = require("cors");

const dotenv = require("dotenv")
const connectDB = require("./config/db.js")

const { notFound , errorHandler } = require("./middleware/errorMiddleware.js")

const chatRoutes = require("./routes/chatRoutes.js")
const userRoutes = require("./routes/userRoutes.js")

var app = express()
dotenv.config()
connectDB()


var port = process.env.PORT || 3000
console.log(process.env.PORT)
console.log(port);

app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("HELLO XHAXHI")
})

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)


app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`)
})