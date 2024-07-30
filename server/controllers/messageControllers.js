const asyncHandler = require("express-async-handler")
const Message = require("../models/messageModel")
const User = require("../models/userModel")
const Chat = require("../models/chatModel")


const sendMessage = asyncHandler(async(req,res)=>{
    const {content, chatId} = req.body
    //console.log(req.body)
    if(!content || !chatId){
        console.log("Missing data: MessageContent or ChatID passed into request")
        return res.sendStatus(400)
    }

    let _chat = await Chat.findById(chatId)

    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: _chat._id
    }

    // console.log("newMessage")
    // console.log(newMessage)

    try {
        let msg = await Message.create(newMessage)

        msg = await msg.populate("sender","name pic")
        msg = await msg.populate("chat")
        msg = await User.populate(msg,{
            path:'chat.users',
            select:'name pic email',
        })

        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage: msg,
        })

        // console.log("MSG")
        // console.log(msg)

        res.json(msg)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const fetchAllMessages = asyncHandler(async(req,res)=>{

  try {
    const messages = await Message.find({chat: req.params.chatId})
    .populate("sender","name pic email")
    .populate("chat")
    
    res.json(messages)
} catch (error) {
    res.status(400)
    throw new Error(error.message) 
}
})




module.exports={ sendMessage, fetchAllMessages }