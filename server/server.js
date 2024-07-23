const express = require("express")
const cors = require("cors");

const dotenv = require("dotenv")
const connectDB = require("./config/db.js")

const { notFound , errorHandler } = require("./middleware/errorMiddleware.js")

const chatRoutes = require("./routes/chatRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const messageRoutes = require("./routes/messageRoutes.js")

const app = express()
dotenv.config()
connectDB()


const port = process.env.PORT || 3000
console.log(process.env.PORT)
console.log(port);

app.use(cors());
app.use(express.json())

/*
app.get('/',(req,res)=>{
    res.send("HELLO XHAXHI")
})*/

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)


app.use(notFound)
app.use(errorHandler)

const server = app.listen(port,()=>{
    console.log(`Server is up on port ${port}`)
})

const io = require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin: "https://localhost:3000"
    }
})

io.on("connection",(socket)=>{
    console.log('connected to socket.io')

socket.on("setup",(userData)=>{
        socket.join(userData._id)
        socket.emit("connected")
    })

socket.on("join chat",(room)=>{
    socket.join(room)
    console.log("User Joined Room:" + room)
})

socket.on("typing",(room)=>socket.in(room).emit("typing"))
socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"))

socket.on("new message",(newMessageReceived)=>{
    let chat = newMessageReceived.chat;

    if(!chat.users) return console.log('chat.users not defined')
    
    chat.users.array.forEach(user => {
        if(user._id == newMessageReceived.sender._id) return

        socket.in(user._id).emit("message received",newMessageReceived)        
    })
})

socket.off("setup",()=>{
    console.log("User Disconnected")
    socket.leave(userData._id)
})
})



